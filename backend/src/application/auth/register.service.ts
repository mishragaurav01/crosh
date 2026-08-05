import { UserRepository } from '../../app/repositories/user.repository.js';
import { RoleRepository } from '../../app/repositories/role.repository.js';
import { PasswordUtility, RegisterMapper } from '../../domain/auth/index.js';
import type {
  RegisterRequest,
  RegisterResponse,
} from '../../domain/auth/index.js';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';
import type { User } from '../../domain/user/index.js';

export class RegisterService {
  private userRepository: UserRepository;
  private roleRepository: RoleRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const emailLowerCase = data.email.toLowerCase();
    const existingUser = await this.userRepository.findByEmail(emailLowerCase);

    if (existingUser) {
      throw new ConflictError(`User with email ${data.email} already exists`);
    }

    const customerRole = await this.roleRepository.findByName('Customer');
    if (!customerRole) {
      throw new NotFoundError('Customer role not found');
    }

    const hashedPassword = await PasswordUtility.hash(data.password);

    const userToCreate = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: emailLowerCase,
      password: hashedPassword,
    } as User;

    const createdUser = await this.userRepository.create(userToCreate);
    const assignedUser = await this.userRepository.assignRole(
      createdUser._id.toString(),
      customerRole._id.toString(),
    );

    if (!assignedUser) {
      throw new Error('Failed to output assigned role for user');
    }

    // Explicitly populate for correct formatting
    await assignedUser.populate('roles');

    if (!assignedUser) {
      throw new Error('Failed to output assigned role for user');
    }

    return RegisterMapper.toResponse(assignedUser);
  }
}

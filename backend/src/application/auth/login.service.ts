import { UserRepository } from '../../app/repositories/user.repository.js';
import { PasswordUtility, JwtUtility } from '../../domain/auth/index.js';
import { LoginMapper } from '../../domain/auth/login.mapper.js';
import type {
  LoginRequest,
  LoginResponse,
} from '../../domain/auth/login.types.js';
import { AuthenticationError } from '../../shared/errors/index.js';

export class LoginService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(
      data.email.toLowerCase(),
    );

    if (!user) {
      throw new AuthenticationError();
    }

    const isPasswordValid = await PasswordUtility.compare(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new AuthenticationError();
    }

    if (!user.isActive) {
      throw new AuthenticationError();
    }

    const userWithRoles = await this.userRepository.findWithRoles(
      user._id.toString(),
    );
    if (!userWithRoles) {
      throw new AuthenticationError();
    }

    const accessToken = JwtUtility.generateToken({
      userId: userWithRoles._id.toString(),
      email: userWithRoles.email,
    });

    return LoginMapper.toResponse(userWithRoles, accessToken);
  }
}

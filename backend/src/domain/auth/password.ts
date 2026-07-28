import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class PasswordUtility {
  /**
   * Hashes a plain-text password.
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * Compares a plain-text password against a stored hash.
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

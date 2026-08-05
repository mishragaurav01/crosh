import { describe, it, expect } from 'vitest';
import { PasswordUtility } from '../../domain/auth/index.js';

describe('PasswordUtility', () => {
  it('should hash a password into a different string', async () => {
    const originalPassword = 'securePassword123';
    const hash = await PasswordUtility.hash(originalPassword);

    expect(hash).not.toBe(originalPassword);
    expect(hash).toBeDefined();
    expect(hash.length).toBeGreaterThan(10);
  });

  it('should return true for comparing correct password', async () => {
    const password = 'mySecretPassword';
    const hash = await PasswordUtility.hash(password);

    const isMatch = await PasswordUtility.compare(password, hash);
    expect(isMatch).toBe(true);
  });

  it('should return false for comparing incorrect password', async () => {
    const password = 'mySecretPassword';
    const hash = await PasswordUtility.hash(password);

    const isMatch = await PasswordUtility.compare('wrongPassword', hash);
    expect(isMatch).toBe(false);
  });
});

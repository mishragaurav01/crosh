export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  [key: string]: string | undefined;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

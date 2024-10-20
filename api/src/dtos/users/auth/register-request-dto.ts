export interface UserRegisterRequestDTO {
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
  dob?: Date;
}

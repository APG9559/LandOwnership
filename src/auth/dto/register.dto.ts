/* eslint-disable prettier/prettier */
// auth/dto/register.dto.ts
export class RegisterDto {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role_id: number;
  phone?: string;
}
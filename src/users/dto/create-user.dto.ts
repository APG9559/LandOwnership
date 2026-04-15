export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role_id: number;
  phone?: string;
}
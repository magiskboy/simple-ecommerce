export interface CreateUserDto {
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  password: string;
  uuid: string;
  email: string;
}

import { User } from '../../models/user';

export interface CreateUserParams {
  fullName: string;
  email: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

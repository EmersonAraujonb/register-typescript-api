import { User } from '../../../models/user';
import { HttpResponse, HttpResquest } from '../../protocols';

export interface ICreateUserController {
    handle(httpResquest: HttpResquest<CreateUserParams>): Promise<HttpResponse<User>>
}

export interface CreateUserParams {
  fullName: string;
  email: string;
  city: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

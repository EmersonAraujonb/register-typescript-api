import { User } from '../../../models/user';
import { HttpResponse, HttpResquest } from '../../protocols';

export interface UpdateUserParams {
  fullName?: string;
  email?: string;
  city?: string;
}

export interface IUpdateUserController {
  handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

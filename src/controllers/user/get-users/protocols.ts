import { User } from '../../../models/user';
import { HttpResponse } from '../../protocols';

export interface IGetUsersControllers {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}

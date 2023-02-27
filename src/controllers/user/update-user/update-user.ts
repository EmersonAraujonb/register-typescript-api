import { User } from '../../../models/user';
import { HttpResquest, HttpResponse } from '../../protocols';
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from './protocols';

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpResquest?.params?.id;
      const body = httpResquest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing user id',
        };
      }
      const allowedFieldToUpdate: (keyof UpdateUserParams)[] = [
        'fullName',
        'email',
        'city',
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldToUpdate.includes(key as keyof UpdateUserParams)
      );
      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Some received field is not allowed',
        };
      }
      const user = await this.updateUserRepository.updateUser(id, body);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Somenthing went wrong.',
      };
    }
  }
}

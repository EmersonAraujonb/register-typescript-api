import validator from 'validator';
import { User } from '../../models/user';
import { HttpResponse, HttpResquest, IController } from '../protocols';
import {
  CreateUserParams,
  ICreateUserRepository,
} from './protocols';

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpResquest: HttpResquest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requireFields = ['fullName', 'email'];
      for (const field of requireFields) {
        if (!httpResquest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }
      const emailIsValid = validator.isEmail(httpResquest.body!.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: 'E-mail is invalid',
        };
      }
      const user = await this.createUserRepository.createUser(
        httpResquest.body!
      );
      return {
        statusCode: 201,
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

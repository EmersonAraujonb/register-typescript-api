import { City } from '../../models/cities';
import { HttpResponse, HttpResquest } from '../protocols';
import {
  CreateCityParams,
  ICreateCityController,
  ICreateCityRepository,
} from './protocols';

export class CreateCityController implements ICreateCityController {
  constructor(private readonly createCityRepository: ICreateCityRepository) {}
  async handle(
    httpResquest: HttpResquest<CreateCityParams>
  ): Promise<HttpResponse<City>> {
    try {
      const requireFields = ['city', 'state'];
      for (const field of requireFields) {
        if (!httpResquest?.body?.[field as keyof CreateCityParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }
      const city = await this.createCityRepository.createCity(
        httpResquest.body!
      );
      return {
        statusCode: 201,
        body: city,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Somenthing went wrong.',
      };
    }
  }
}
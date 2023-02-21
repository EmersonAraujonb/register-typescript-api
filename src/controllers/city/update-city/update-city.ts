import { City } from '../../../models/city';
import { HttpResquest, HttpResponse } from '../../protocols';
import { IUpdateCityController, IUpdateCityRepository, UpdateCityParams } from './protocols';

export class UpdateCityController implements IUpdateCityController {
  constructor(private readonly updateCityRepository: IUpdateCityRepository){}
    async handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<City>> {
    const id = httpResquest?.params?.id;
    const body = httpResquest?.body;
    try {
      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing city id',
        };
      }
      const allowedFieldToUpdate: (keyof UpdateCityParams)[] = [
        'city',
        'state',
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldToUpdate.includes(key as keyof UpdateCityParams)
      );
      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Some received field is not allowed',
        };
      }
      const city = await this.updateCityRepository.updateCity(id, body)
      return {
        statusCode: 200,
        body: city 
    }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Somenthing went wrong.',
      };
    }
  }
}
import { City } from '../../../models/city';
import { HttpResquest, HttpResponse } from '../../protocols';
import {
  IUpdateCityController,
  IUpdateCityRepository,
  UpdateCityParams,
} from './protocols';

export class UpdateCityController implements IUpdateCityController {
  constructor(private readonly updateCityRepository: IUpdateCityRepository) {}
  async handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<City>> {
    try {
      const id = httpResquest?.params?.id;
      const body = httpResquest?.body;
      
      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing city id',
        };
      }
      const city = await this.updateCityRepository.updateCity(id, body);
      return {
        statusCode: 200,
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

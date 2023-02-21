import { City } from '../../../models/city';
import { HttpResponse, HttpResquest } from '../../protocols';

export interface IDeleteCityController {
  handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<City>>;
}

export interface IDeleteCityRepository {
  deleteCity(id: string): Promise<City>;
}

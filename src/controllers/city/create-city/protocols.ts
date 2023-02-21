import { City } from '../../../models/city';
import { HttpResponse, HttpResquest } from '../../protocols';

export interface ICreateCityController {
    handle(httpResquest: HttpResquest<CreateCityParams>): Promise<HttpResponse<City>>
}

export interface CreateCityParams {
  city: string;
  state: string;
}

export interface ICreateCityRepository {
  createCity(params: CreateCityParams): Promise<City>;
}

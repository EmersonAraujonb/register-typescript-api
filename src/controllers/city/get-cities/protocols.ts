import { City } from '../../../models/city';
import { HttpResponse } from '../../protocols';

export interface IGetCitiesControllers {
  handle(): Promise<HttpResponse<City[]>>;
}

export interface IGetCitiesRepository {
  getCities(): Promise<City[]>;
}

import {
  CreateCityParams,
  ICreateCityRepository,
} from '../../../controllers/city/create-city/protocols';
import { MongoClient } from '../../../database/mongo';
import { City } from '../../../models/city';

export class MongoCreateCityRepository implements ICreateCityRepository {
  async createCity(params: CreateCityParams): Promise<City> {
    const { insertedId } = await MongoClient.db
      .collection('cities')
      .insertOne(params);

    const city = await MongoClient.db
      .collection<Omit<City, 'id'>>('cities')
      .findOne({ _id: insertedId });
    if (!city) {
      throw new Error('City not created');
    }
    const { _id, ...rest } = city;
    return { id: _id.toHexString(), ...rest };
  }
}

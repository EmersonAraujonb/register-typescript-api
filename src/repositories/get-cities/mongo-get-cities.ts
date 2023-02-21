import { IGetCitiesRepository } from '../../controllers/get-cities/protocols';
import { MongoClient } from '../../database/mongo';
import { City } from '../../models/city';

export class MongoGetCitiesRepository implements IGetCitiesRepository {
  async getCities(): Promise<City[]> {
    const cities = await MongoClient.db
      .collection<Omit<City, 'id'>>('cities')
      .find({})
      .toArray();

    return cities.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}

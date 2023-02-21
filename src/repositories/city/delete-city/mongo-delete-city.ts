import { ObjectId } from 'mongodb';
import { IDeleteCityRepository } from '../../../controllers/city/delete-city/protocols';
import { MongoClient } from '../../../database/mongo';
import { City } from '../../../models/city';

export class MongoDeleteCityRepository implements IDeleteCityRepository {
  async deleteCity(id: string): Promise<City> {
    const city = await MongoClient.db
      .collection<Omit<City, 'id'>>('cities')
      .findOne({ _id: new ObjectId(id) });
    if (!city) {
      throw new Error('City not found');
    }
    const { deletedCount } = await MongoClient.db
      .collection('cities')
      .deleteOne({ _id: new ObjectId(id) });
    if (!deletedCount) {
      throw new Error('City not deleted');
    }
    const { _id, ...rest } = city;
    return { id: _id.toHexString(), ...rest };
  }
}

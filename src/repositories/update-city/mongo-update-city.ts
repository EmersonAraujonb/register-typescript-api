import { ObjectId } from 'mongodb';
import {
  IUpdateCityRepository,
  UpdateCityParams,
} from '../../controllers/update-city/protocols';
import { MongoClient } from '../../database/mongo';
import { City } from '../../models/city';

export class MongoUpdateCityRepository implements IUpdateCityRepository {
  async updateCity(id: string, params: UpdateCityParams): Promise<City> {
    await MongoClient.db.collection('cities').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );
    const city = await MongoClient.db
      .collection<Omit<City, 'id'>>('cities')
      .findOne({ _id: new ObjectId(id) });
    if (!city) {
      throw new Error('City not updated');
    }
    const {_id, ...rest} = city;
    return {id: _id.toHexString(), ...rest}
  }
}
import express from 'express';
import { config } from 'dotenv';
import { GetUsersControllers } from './controllers/user/get-users/get-users';
import { MongoGetUsersRepository } from './repositories/user/get-users/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/user/create-user/mongo-create-user';
import { CreateUserController } from './controllers/user/create-user/create-user';
import { MongoUpdateUserRepository } from './repositories/user/update-user/mongo-update-user';
import { UpdateUserController } from './controllers/user/update-user/update-user';
import { MongoDeleteUserRepository } from './repositories/user/delete-user/mongo-delete-user';
import { DeleteUserController } from './controllers/user/delete-user/delete-user';
import { MongoCreateCityRepository } from './repositories/city/create-city/mongo-create-city';
import { CreateCityController } from './controllers/city/create-city/create-city';
import { MongoGetCitiesRepository } from './repositories/city/get-cities/mongo-get-cities';
import { GetCitiesControllers } from './controllers/city/get-cities/get-cities';
import { MongoUpdateCityRepository } from './repositories/city/update-city/mongo-update-city';
import { UpdateCityController } from './controllers/city/update-city/update-city';
import { MongoDeleteCityRepository } from './repositories/city/delete-city/mongo-delete-city';
import { DeleteCityController } from './controllers/city/delete-city/delete-city';
import { User } from './models/user';
import { City } from './models/city';
const cors = require('cors');

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  app.use(cors());

  await MongoClient.connect();

  // peoples

  app.get('/peoples', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersControllers = new GetUsersControllers(
      mongoGetUsersRepository
    );
    const { statusCode } = await getUsersControllers.handle();
    res.header('Access-Control-Allow-Origin', '*');

    let { limit = 0, page = 1 }: unknown | any = req.query;
    limit = parseInt(limit);
    page = Number(page - 1);

    const IdUsers = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .find({})
      .skip(page * limit)
      .limit(limit)
      .toArray();

    const data = IdUsers.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));

    const {search}: unknown| any = req.query;

    const results = search ? data.filter(user => user.fullName.includes(search)) : data;

    res.status(statusCode).send(results);
    return results;
  });

  app.post('/peoples', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );
    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.patch('/peoples/:id', async (req, res) => {
    const updateUsersRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      updateUsersRepository
    );
    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.delete('/peoples/:id', async (req, res) => {
    const deleteUsersRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      deleteUsersRepository
    );
    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });
  // cities
  app.get('/cities', async (req, res) => {
    const mongoGetCitiesRepository = new MongoGetCitiesRepository();
    const getCitiesControllers = new GetCitiesControllers(
      mongoGetCitiesRepository
    );
    const { statusCode } = await getCitiesControllers.handle();
    res.header('Access-Control-Allow-Origin', '*');

    let { limit = 0, page = 1 }: unknown | any = req.query;
    limit = parseInt(limit);
    page = Number(page - 1);

    const IdCities = await MongoClient.db
      .collection<Omit<City, 'id'>>('cities')
      .find({})
      .skip(page * limit)
      .limit(limit)
      .toArray();

    const data = IdCities.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));

    const {search}: unknown| any = req.query;

    const results = search ? data.filter(city => city.city.includes(search)) : data;

    res.status(statusCode).send(results);
    return results;
  });

  app.post('/cities', async (req, res) => {
    const mongoCreateCityRepository = new MongoCreateCityRepository();
    const createCityController = new CreateCityController(
      mongoCreateCityRepository
    );
    const { body, statusCode } = await createCityController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.patch('/cities/:id', async (req, res) => {
    const updateCityRepository = new MongoUpdateCityRepository();
    const updateCityController = new UpdateCityController(updateCityRepository);
    const { body, statusCode } = await updateCityController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.delete('/cities/:id', async (req, res) => {
    const deleteCityRepository = new MongoDeleteCityRepository();
    const deleteCityController = new DeleteCityController(deleteCityRepository);
    const { body, statusCode } = await deleteCityController.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port:${port}!`));
};

main();

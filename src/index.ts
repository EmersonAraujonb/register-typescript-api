import express from 'express';
import { config } from 'dotenv';
import { GetUsersControllers } from './controllers/get-users/get-users';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user/create-user';
import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-user';
import { UpdateUserController } from './controllers/update-user/update-user';

const main = async () => {
    config();
    
    const app = express();
    app.use(express.json())
    
    await MongoClient.connect();
    
    app.get('/peoples', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersControllers = new GetUsersControllers(
      mongoGetUsersRepository
    );
    const { body, statusCode } = await getUsersControllers.handle();
    res.status(statusCode).send(body);
  });

  app.post('/peoples', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController =  new CreateUserController(mongoCreateUserRepository);
    const {body, statusCode} = await createUserController.handle({ body: req.body})
    res.status(statusCode).send(body)
})

  app.patch('/peoples/:id', async (req, res) => {
    const updateUsersRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(updateUsersRepository);
    const {body, statusCode} = await updateUserController.handle({body: req.body, params: req.params})
    res.status(statusCode).send(body);
})

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port:${port}!`));
};

main();

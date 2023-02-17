import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
   async getUsers(): Promise<User[]> {
     return [{
        fullName: "Emerson Araújo",
        email: "emerson@gmail.com"
    }]
    }

}
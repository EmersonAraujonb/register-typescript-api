import { User } from "../../models/user";
import { HttpResquest, HttpResponse } from "../protocols";
import { IDeleteUserController, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteUserController {
   constructor(private readonly deleteUserRepository: IDeleteUserRepository){}
    async handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpResquest?.params?.id;

            if (!id) {
                return {
                    statusCode: 400,
                    body:'Missing user id'
                }
            }
            const user = await this.deleteUserRepository.deleteUser(id);
            return {
                statusCode: 200,
                body: user
            }
        } catch (error) {
            return {
                statusCode:500,
                body: 'Somenthing went wrong'
            }
        }
    }
    
}
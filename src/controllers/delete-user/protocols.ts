import { User } from "../../models/user";
import { HttpResponse, HttpResquest } from "../protocols";

export interface IDeleteUserController{
    handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<User>>
}

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>
}
import { User } from "../../models/user";
export interface UpdateUserParams {
    fullName?: string,
    email?: string
}

export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>
}
import { City } from "../../models/city";
import { HttpResponse, HttpResquest } from "../protocols";

export interface UpdateCityParams {
    city?: string,
    state?: string
}

export interface IUpdateCityController {
    handle(httpResquest: HttpResquest<any>):Promise<HttpResponse<City>>
}

export interface IUpdateCityRepository {
    updateCity(id: string, params: UpdateCityParams): Promise<City>
}
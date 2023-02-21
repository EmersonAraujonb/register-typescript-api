import { City } from "../../../models/city";
import { HttpResquest, HttpResponse } from "../../protocols";
import { IDeleteCityController, IDeleteCityRepository } from "./protocols";

export class DeleteCityController implements IDeleteCityController {
   constructor(private readonly deleteCityRepository: IDeleteCityRepository){}
    async handle(httpResquest: HttpResquest<any>): Promise<HttpResponse<City>> {
        try {
            const id = httpResquest?.params?.id;

            if (!id) {
                return {
                    statusCode: 400,
                    body:'Missing city id'
                }
            }
            const city = await this.deleteCityRepository.deleteCity(id);
            return {
                statusCode: 200,
                body: city
            }
        } catch (error) {
            return {
                statusCode:500,
                body: 'Somenthing went wrong'
            }
        }
    }
    
}
import { IGetCitiesControllers, IGetCitiesRepository } from './protocols';

export class GetCitiesControllers implements IGetCitiesControllers {
  constructor(private readonly getCitiesRepository: IGetCitiesRepository) {}
  async handle() {
    try {
      const cities = await this.getCitiesRepository.getCities();
      return {
        statusCode: 200,
        body: cities,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Somenthing went wrong.',
      };
    }
  }
}
 
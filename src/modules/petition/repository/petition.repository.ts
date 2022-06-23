import { IPetition } from '../models';

export abstract class PetitionRepository {
  abstract addPetition(petition: any): Promise<any>;

  abstract getPetitionsByUserId(userId: string): Promise<IPetition[]>;

  abstract getPetitionById(id: string): Promise<IPetition>;
}

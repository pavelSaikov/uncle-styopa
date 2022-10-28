import { IPetition } from '../models';

export abstract class PetitionRepository {
  abstract addPetition(petition: Omit<IPetition, 'id'>): Promise<any>;

  abstract getPetitionsByUserId(userId: string): Promise<IPetition[]>;

  abstract getPetitionById(id: string): Promise<IPetition>;
}

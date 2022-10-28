import { Injectable } from '@nestjs/common';

import { AddPetitionDto, IPetition, PetitionStatus } from './models';
import { PetitionRepository } from './repository';

@Injectable()
export class PetitionService {
  constructor(private petitionRepository: PetitionRepository) {}

  addPetition(petition: AddPetitionDto): Promise<string> {
    return this.petitionRepository.addPetition({ ...petition, petitionStatus: PetitionStatus.NEW });
  }

  getPetitionsByUserId(id: string): Promise<IPetition[]> {
    return this.petitionRepository.getPetitionsByUserId(id);
  }
}

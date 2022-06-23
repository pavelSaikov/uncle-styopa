import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPetition } from 'src/modules/petition/models';
import { AddPetitionDto } from 'src/modules/petition/models/add-petition.dto';
import { PetitionRepository } from '../petition.repository';
import { Petition, PetitionDocument } from './petition.schema';

export class MongoPetitionRepository extends PetitionRepository {
  constructor(@InjectModel(Petition.name) private petitionModel: Model<PetitionDocument>) {
    super();
  }

  addPetition(petition: AddPetitionDto): Promise<string> {
    const newPetition = new this.petitionModel(petition);
    return newPetition.save().then(({ _id }) => _id.toString());
  }

  getPetitionsByUserId(userId: string): Promise<IPetition[]> {
    return this.petitionModel
      .find({ userId: userId })
      .exec()
      .then((petitions) => petitions.map((petition) => Object.assign(petition, { id: petition._id.toString() })));
  }

  getPetitionById(id: string): Promise<IPetition> {
    return this.petitionModel.findOne({ id }).exec();
  }
}

import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';

import { AddPetitionDto, JwtAuthGuard } from 'src/modules';
import { PetitionService } from './petition.service';
import { InjectAddressPipe } from './pipes';

@UseGuards(JwtAuthGuard)
@Controller('/petition')
export class PetitionController {
  constructor(private petitionService: PetitionService) {}

  @Post()
  @UsePipes(InjectAddressPipe)
  addPetition(@Body() petition: AddPetitionDto) {
    return this.petitionService.addPetition(petition);
  }

  @Get('/:id')
  getPetitionById(@Param('id') id: string) {
    return this.petitionService.getPetitionsByUserId(id);
  }

  @Get('/user/:userId')
  getPetitionsByUserId(@Param('userId') userId: string) {
    return this.petitionService.getPetitionsByUserId(userId);
  }
}

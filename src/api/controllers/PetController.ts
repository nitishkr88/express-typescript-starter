import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  OnUndefined
} from 'routing-controllers'
import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator'

import { UserResponse } from './UserController'
import { PetService } from '../services/PetService'
import { Pet } from '../models/Pet'
import { PetNotFoundError } from '../errors/PetNotFoundError'

class BasePet {
  @IsNotEmpty()
  public name: string

  @IsNumber()
  public age: number
}

export class PetResponse extends BasePet {
  @IsUUID()
  public id: string

  @ValidateNested()
  public user: UserResponse
}

class CreatePetBody extends BasePet {
  @IsUUID()
  public userId: string
}

@JsonController('/pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  public find(): Promise<Pet[]> {
    return this.petService.find()
  }

  @Get('/:id')
  @OnUndefined(PetNotFoundError)
  public one(@Param('id') id: string): Promise<Pet | undefined> {
    return this.petService.findOne(id)
  }

  @Post()
  public create(@Body({ required: true }) body: CreatePetBody): Promise<Pet> {
    const pet = new Pet()
    pet.age = body.age
    pet.name = body.name
    pet.userId = body.userId

    return this.petService.create(pet)
  }

  @Put('/:id')
  public update(@Param('id') id: string, @Body() body: BasePet): Promise<Pet> {
    const pet = new Pet()
    pet.age = body.age
    pet.name = body.name

    return this.petService.update(id, pet)
  }

  @Delete('/:id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.petService.delete(id)
  }
}

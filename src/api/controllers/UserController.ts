import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  OnUndefined,
  Authorized
} from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { IsNotEmpty, IsEmail, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { UserService } from '../services/UserService'
import { User } from '../models/User'
import { PetResponse } from './PetController'
import { UserNotFoundError } from '../errors/UserNotFoundError'

class BaseUser {
  @IsNotEmpty()
  public firstName: string

  @IsNotEmpty()
  public lastName: string

  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsNotEmpty()
  public username: string
}

export class UserResponse extends BaseUser {
  @IsUUID()
  public id: string

  @ValidateNested({ each: true })
  @Type(() => PetResponse)
  public pets: PetResponse[]
}

class CreateUserBody extends BaseUser {
  @IsNotEmpty()
  public password: string
}

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ResponseSchema(UserResponse, { isArray: true })
  public find(): Promise<User[]> {
    return this.userService.find()
  }

  @Get('/:id')
  @OnUndefined(UserNotFoundError)
  @ResponseSchema(UserResponse)
  public one(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findOne(id)
  }

  @Post()
  @ResponseSchema(UserResponse)
  public create(@Body() body: CreateUserBody): Promise<User> {
    const user = new User()
    user.email = body.email
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.username = body.username
    user.password = body.password

    return this.userService.create(user)
  }

  @Put('/:id')
  @ResponseSchema(UserResponse)
  public update(
    @Param('id') id: string,
    @Body() body: BaseUser
  ): Promise<User> {
    const user = new User()
    user.email = body.email
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.username = body.username

    return this.userService.update(id, user)
  }

  @Delete('/:id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }
}

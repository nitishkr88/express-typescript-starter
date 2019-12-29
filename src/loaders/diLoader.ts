import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { useContainer as classValidatorUseContainer } from 'class-validator'
import { useContainer as routingControllersUseContainer } from 'routing-controllers'
import { useContainer as ormUseContainer } from 'typeorm'
import { Container } from 'typedi'

export const diLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  routingControllersUseContainer(Container)
  ormUseContainer(Container)
  classValidatorUseContainer(Container)
}

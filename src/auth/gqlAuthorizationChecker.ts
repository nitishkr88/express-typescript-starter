import { AuthChecker } from 'type-graphql'
import Container from 'typedi'
import { AuthService } from './AuthService'

import { Context } from '../api/Context'
import { Logger } from '../lib/logger'

export const gqlAuthorizationChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  const log = new Logger(__filename)
  const authService = Container.get<AuthService>(AuthService)

  const credentials = authService.parseBasicAuthFromRequest(context.request)

  if (credentials === undefined) {
    log.warn('No credentials given')
    return false
  }

  const user = await authService.validateUser(
    credentials.username,
    credentials.password
  )
  if (user === undefined) {
    log.warn('Invalid credentials provided')
    return false
  }

  log.info('Successfully checked credentials')
  return true
}

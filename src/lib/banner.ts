import { env } from '../env'
import { Logger } from '../lib/logger'

export function banner(log: Logger): void {
  if (env.app.banner) {
    const route = (): string => `${env.app.schema}://${env.app.host}:${env.app.port}`
    log.info(``)
    log.info(`App is running on ${route()}${env.app.routePrefix}`)
    log.info(`Press <CTRL> + C to shut it down.`)
    log.info(``)
    log.info(`-------------------------------------------------------`)
    log.info(`Environment  : ${env.node}`)
    log.info(`Version      : ${env.app.version}`)
    log.info(``)
    log.info(`API Info     : ${route()}${env.app.routePrefix}`)
    if (env.graphql.enabled)
      log.info(`GraphQL      : ${route()}${env.graphql.route}`)
    if (env.swagger.enabled)
      log.info(`Swagger      : ${route()}${env.swagger.route}`)
    log.info(`-------------------------------------------------------`)
    log.info(``)
  } else {
    log.info(`Application is up and running`)
  }
}

import morgan from 'morgan'
import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

import { env } from '../../env'
import { Logger } from '../../lib/logger'

@Middleware({ type: 'before' })
export class LogMiddlware implements ExpressMiddlewareInterface {
  private log = new Logger(__filename)

  public use(req: Request, res: Response, next: NextFunction) {
    return morgan(env.log.output, {
      stream: {
        write: this.log.info.bind(this.log)
      }
    })(req, res, next)
  }
}

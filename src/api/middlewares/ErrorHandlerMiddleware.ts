import { Request, Response, NextFunction } from 'express'
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
  HttpError
} from 'routing-controllers'

import { Logger, LoggerInterface } from '../../decorators/Logger'
import { env } from '../../env'

@Middleware({ type: 'after' })
export class ErrorHadlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = env.isProduction

  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public error(
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(error.httpCode || 500)
    res.json({
      name: error.name,
      message: error.message,
      errors: error['errors'] || []
    })

    if (this.isProduction) {
      this.log.error(error.name, error.message)
    } else {
      this.log.error(error.name, error.stack)
    }
  }
}

import helmet from 'helmet'
import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class SecuritytMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction) {
    return helmet()(req, res, next)
  }
}

import { Request, Response, Application } from 'express'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'

import { env } from '../env'

export const homeLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const expressApp: Application = settings.getData('express_app')
    expressApp.get(env.app.routePrefix, (req: Request, res: Response) => {
      return res.json({
        name: env.app.name,
        version: env.app.version,
        description: env.app.description
      })
    })
  }
}

import express, { Application } from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'

export const publicLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const expressApp: Application = settings.getData('express_app')
    expressApp
      .use(
        express.static(path.join(__dirname, '..', 'public'), {
          maxAge: 31557600000
        })
      )
      .use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
  }
}

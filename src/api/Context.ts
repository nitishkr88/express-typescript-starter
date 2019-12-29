import { Request, Response } from 'express'
import { ContainerInstance } from 'typedi'

export interface Context {
  requestId: number
  request: Request
  response: Response
  container: ContainerInstance
}

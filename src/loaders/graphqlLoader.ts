import GraphQLHTTP from 'express-graphql'
import path from 'path'
import Container from 'typedi'
import { buildSchema, ResolverData } from 'type-graphql'
import { Request, Response, Application } from 'express'
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework-w3tec'
import playground from 'graphql-playground-middleware-express'

import { env } from '../env'
import { Context } from '../api/Context'
import { gqlAuthorizationChecker } from '../auth/gqlAuthorizationChecker'

export const graphqlLoader: MicroframeworkLoader = async (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings && env.graphql.enabled) {
    const expressApp: Application = settings.getData('express_app')

    const schema = await buildSchema({
      resolvers: env.app.dirs.resolvers,
      emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
      container: ({ context }: ResolverData<Context>) => context.container,
      authChecker: gqlAuthorizationChecker,
      authMode: 'error'
    })

    expressApp.get('/graphql', playground({ endpoint: '/graphql' }))

    expressApp.use(
      env.graphql.route,
      (request: Request, response: Response) => {
        // build graphql context and assign scoped container
        const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        const container = Container.of(requestId)
        const context = { requestId, container, request, response }
        container.set('context', context)

        GraphQLHTTP({
          schema,
          context
          // graphiql: env.graphql.editor
        })(request, response)
      }
    )
  }
}

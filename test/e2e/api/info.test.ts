import request from 'supertest'

import { env } from '../../../src/env'
import { BootstrapSettings, bootstrapApp } from '../utils/bootstrap'

describe('/api', () => {
  let settings: BootstrapSettings
  beforeAll(async () => (settings = await bootstrapApp()))

  test('GET: / should return the api version', async () => {
    const response = await request(settings.app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.version).toBe(env.app.version)
  })
})

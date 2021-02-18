import request from 'supertest'
import app from "../index"
import mongoUnit from 'mongo-unit';

describe('Test Survey Endpoints', () => {

  beforeEach(() => mongoUnit.load({}))
  afterEach(() => mongoUnit.drop())

  it('should create a new survey', async () => {
    const res = await request(app)
      .post('/api/survey/create')
      .send({
        title: 'test is cool',
      })

    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })
})
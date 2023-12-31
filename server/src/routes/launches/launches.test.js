const request = require('supertest')
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const { loadPlanetsData } = require('../../models/planets.model')

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect()
    await loadPlanetsData()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  describe('Test Get /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/api/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200)
      //expect(response).toBe(200)
    })
  })

  describe('Test POST /launches', () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'January 4, 2028',
    }
    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
    }
    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'zoot',
    }
    test('It should respond with 201 success', async () => {
      const response = await request(app)
        .post('/api/v1/launches')
        .send(completeLaunchData)
        .expect(201)
        .expect('Content-Type', /json/)

      const requestDate = new Date(completeLaunchData.launchDate).valueOf()
      const responseDate = new Date(response.body.launchDate).valueOf()

      expect(response.body).toMatchObject(launchDataWithoutDate)
      expect(responseDate).toBe(requestDate)
    })
    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/api/v1/launches')
        .send(launchDataWithoutDate)
        .expect(400)
        .expect('Content-Type', /json/)

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      })
    })
    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/api/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect('Content-Type', /json/)

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      })
    })
  })
})

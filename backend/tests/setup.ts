import { app } from '../app'
import request from 'supertest'

module.exports = async function (globalConfig, projectConfig) {
	const response = await request(app).post('/api/register').send({
		name: 'test',
		password: 'test',
	})

	const authHeaders = response.headers['set-cookie']

	await request(app).post('/api/foxes').set('Cookie', authHeaders).send({
		content: 'Hello world!',
	})
}

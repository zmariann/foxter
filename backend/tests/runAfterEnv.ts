import { db } from '../database/db'

afterAll(() => {
	db.close()
})

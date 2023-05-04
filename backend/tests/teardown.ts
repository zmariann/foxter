import fs from 'fs/promises'
import { db } from '../database/db'

module.exports = async function (globalConfig, projectConfig) {
	db.close()

	try {
		await fs.rm('test.db')
	} catch (e) {
		console.log(e)
	}
}

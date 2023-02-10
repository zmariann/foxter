import express from 'express';
import cors from 'cors';
require('dotenv').config()

import { foxRouter } from './api/foxes';
import { loggerMiddleware } from './api/logger'

const app = express();
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

app.use(loggerMiddleware)

app.use('/api', [foxRouter])

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});

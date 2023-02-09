import express from 'express';
import cors from 'cors';

import { foxRouter } from './api/foxes';
import { loggerMiddleware } from './api/logger'

const app = express();

app.use(cors())
app.use(express.json())

app.use(loggerMiddleware)

app.use('/api', [foxRouter])

app.listen(5000, () => {
    console.log("Listening at port 5000")
});

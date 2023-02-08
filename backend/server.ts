import express from 'express';
import cors from 'cors';


import { foxRouter } from './api/foxes';

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', [foxRouter])

app.listen(5000, () => {
    console.log("Listening at port 5000")
});

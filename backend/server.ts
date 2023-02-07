import express from 'express';
import { foxRouter } from './api/foxes';

const app = express();

app.use(express.json())
app.use('/api', [foxRouter])

app.listen(5000, () => {
    console.log("Listening at port 5000")
});

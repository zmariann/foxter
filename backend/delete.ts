import express, { Request, Response } from 'express';
const app = express();

app.delete('api/foxes/:id', async (req: Request, res: Response) => {
    try {
        const entry = await deleteFox(req.params.id);
        if (!entry) {
            return res.status(403).send('No entry was fount with this ID')
        }
        res.status(200).send('Entry deleted');
    } catch (error) {
        res.send(error.message);
    }

});


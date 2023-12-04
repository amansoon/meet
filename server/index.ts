import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import peerRoute from './routes/peer'

const app: Application = express()

const port: number = 3000

app.use(cors({origin: true}));
app.use(express.json());

app.use('/api/peer', peerRoute)


app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
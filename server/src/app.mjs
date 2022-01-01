import express from 'express'
import cors from 'cors'
import db from 'mongoose'
import config from 'config'

import authRouter  from './routes/auth.route.mjs'
import workerRouter from './routes/worker.route.mjs'

db.set('useFindAndModify', false);
const app = express()
app.use(express.json({ limit: '10mb' }))

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
}))

app.use('/api/auth', authRouter)
app.use('/api/worker', workerRouter)
const PORT = process.env.PORT || 5000
const DB_URI = process.env.MONGO_URL || config.get('mongoURILocal')

const start = async () => {
    try {
        await db.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }, (err) => {
            if (err) {
                throw new Error(`Connection to DB: ${err.message}`)
            }
            app.listen(PORT, () => console.log(`App has been started on port ${ PORT }`))
        })

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
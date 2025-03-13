import express from 'express'
import cors from 'cors'
import connectDB from './utils/db'
import notesRouter from './controllers/notes'

const app = express()

app.use(cors())
app.use(express.json())

void connectDB()

app.get('/', (_req, res) => {
  res.json({
    message: 'Express API Starter Kit is running',
  })
})

app.use('/api/notes', notesRouter)

export default app

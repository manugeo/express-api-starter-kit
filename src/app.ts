import express from 'express'
import cors from 'cors'
import connectDB from './utils/db'

const app = express()

app.use(cors())
app.use(express.json())

void connectDB()

app.get('/', (_req, res) => {
  res.json({
    message: 'Express API Starter Kit is running',
  })
})

export default app

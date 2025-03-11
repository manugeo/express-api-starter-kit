import mongoose from 'mongoose'
import logger from './logger'
import config from './config'

/**
 * Connects to MongoDB
 */
const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false)
    logger.info('Connecting to MongoDB...')
    await mongoose.connect(config.MONGODB_URI || '')
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB: ', error)
    process.exit(1)
  }
}

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err)
})

export default connectDB

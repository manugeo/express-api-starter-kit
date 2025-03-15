import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'
import mongoose from 'mongoose'
import logger from './logger'

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error('Error occurred:', error)

  if (error instanceof ZodError) {
    res.status(400).send({
      success: false,
      message: 'Validation failed',
      errors: error.errors,
    })
    return
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {}
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message
    })
    res.status(400).send({
      success: false,
      message: 'Validation failed',
      errors,
    })
    return
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({
      success: false,
      message: `Invalid ${error.path}: ${error.value}`,
    })
    return
  }

  if (error instanceof Error) {
    res.status(500).send({
      success: false,
      message: error.message || 'Internal server error',
    })
    return
  }

  res.status(500).send({
    success: false,
    message: 'Unknown error occurred',
  })
  return
}

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: 'Unknown endpoint',
  })
}

/**
 * Creates a middleware function that validates request data against a Zod schema
 * @param schema The Zod schema to validate against
 * @param source Where to find the data to validate (default: 'body')
 */
export const validateSchema = (
  schema: ZodSchema,
  source: 'body' | 'query' | 'params' = 'body',
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // Try-catch needed because Zod throws synchronous errors that express-async-errors can't catch
      schema.parse(req[source])
      next()
    } catch (error) {
      next(error)
    }
  }
}

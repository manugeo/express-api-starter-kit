import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('Error occurred:', error)

  if (error instanceof ZodError) {
    res.status(400).send({
      success: false,
      message: 'Invalid request data',
      errors: error.errors,
    })
    return
  }

  //Todo: Handle mongoose validation errors

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
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: 'Unknown endpoint',
  })
}

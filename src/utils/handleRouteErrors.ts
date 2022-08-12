import { NextFunction, Request, Response } from 'express'

export const handleRouteErrors = (
  error: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200)
  res.json({
    data: {},
    resultCode: 1,
    messages: [error.message],
  })
}

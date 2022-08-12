import createError from 'http-errors'
import { IPayload, IRequest } from '../types/index'
import { NextFunction, Request, Response } from 'express'
import { decodeToken } from '../utils/jwtTokenUtils'

//token includes {id, roles}
export const allAndVerifyToken = (
  req: IRequest,
  _: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next()
    }
    const token = authHeader.split(' ')[1]
    if (token.length < 1 || token === 'null') {
      return next()
    }

    //include user data from token in to request
    req.user = decodeToken(token) as IPayload
    if (!req.user) {
      return next(createError(500, 'You are not authorizated'))
    }
    next()
  } catch {
    return next(createError(500, 'Wrong Token'))
  }
}

export const verifyToken = (req: IRequest, _: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(createError(500, 'Empty Token'))
    }
    const token = authHeader.split(' ')[1]
    if (token.length < 1 || token === 'null') {
      return next(createError(500, 'Empty Token'))
    }

    //include user data from token in to request
    req.user = decodeToken(token) as IPayload
    if (!req.user) {
      return next(createError(500, 'You are not authorizated'))
    }
    next()
  } catch {
    return next(createError(500, 'Wrong Token'))
  }
}

export const verifyTokenAndAdmin = (
  req: IRequest,
  res: Response,
  next: NextFunction
) =>
  verifyToken(req, res, () => {
    if (req.user?.roles.includes('ADMIN')) {
      return next()
    } else {
      return next(createError(500, 'No permittion'))
    }
  })

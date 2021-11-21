import jwt, { JwtPayload } from "jsonwebtoken"
import createError from "http-errors"
import { IRequest } from "../types/index"
import { Response } from 'express'

//token includes {id, roles}
export const allAndVerifyToken = (req: IRequest, res: Response, next: any) => {
  if (req.method === 'OPTIONS') { next() }
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) { return next() }
    const token = authHeader.split(' ')[1]
    if (token.length < 1 || token === 'null') { return next() }
    const decodeData = jwt.verify(token, process.env.JWT_SEC || '') as JwtPayload
    //include user data from token in to request
    req.user = decodeData
    next()
  } catch {
    return next(createError(500, "Wrong Token"))
  }
}
export const verifyToken = (req: IRequest, res: Response, next: any) => {
  if (req.method === 'OPTIONS') { next() }
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) { return next(createError(500, "Empty Token")) }
    const token = authHeader.split(' ')[1]
    if (token.length < 1 || token === 'null') { return next(createError(500, "Empty Token")) }
    const decodeData = jwt.verify(token, process.env.JWT_SEC || '') as JwtPayload
    //include user data from token in to request
    req.user = decodeData
    next()
  } catch {
    return next(createError(500, "Wrong Token"))
  }
}

export const verifyTokenAndAdmin = (req: IRequest, res: Response, next: any) =>
  verifyToken(req, res, () => {
    if (req.user?.roles.includes('ADMIN')) { return next() }
    else { return next(createError(500, "No permittion")) }
  })

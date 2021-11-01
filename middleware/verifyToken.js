import createError from 'http-errors';
import jwt from 'jsonwebtoken';

//token includes {id, roles}
export const allAndVerifyToken = (req, res, next) => {

  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.apikey
    if (!authHeader) { next() }
    else {
      const token = authHeader.split(' ')[1]
      const decodeData = jwt.verify(token, process.env.JWT_SEC)
      //include user data from token in to request
      req.user = decodeData
      next()
    }
  } catch {
    return next(createError(500, "Wrong Token"))
  }
}
export const verifyToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.apikey
    if (!authHeader) { return next(createError(500, "Empty Token")) }
    const token = authHeader.split(' ')[1]
    const decodeData = jwt.verify(token, process.env.JWT_SEC)
    //include user data from token in to request
    req.user = decodeData
    next()
  } catch {
    return next(createError(500, "Wrong Token"))
  }
}

export const verifyTokenAndAdmin = (req, res, next) =>
  verifyToken(req, res, () => {
    if (req.user.roles.includes('ADMIN')) {
      next()
    } else { return next(createError(500, "No permittion")) }
  })
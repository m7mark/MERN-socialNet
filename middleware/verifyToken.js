import createError from 'http-errors';
import jwt from 'jsonwebtoken';

//token includes {id, roles}
export const verifyToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.apikey
    const token = authHeader.split(' ')[1]
    if (!token) { return next(createError(500, "Empty Token")) }

    const decodeData = jwt.verify(token, process.env.JWT_SEC)
    req.user = decodeData
    next()
  } catch {
    return next(createError(500, "Invalid Token"))
  }
}

export const verifyTokenAndAdmin = (req, res, next) =>
  verifyToken(req, res, () => {
    if (req.user.roles.includes('ADMIN')) {
      next()
    } else { return next(createError(500, "No permittion")) }
  })
import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateAccessToken = (id: string, roles: Array<string>) => {
  const payload = { id, roles }
  return jwt.sign(payload, process.env.JWT_SEC || '', { expiresIn: '3d' })
}

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SEC || '') as JwtPayload
}

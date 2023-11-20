import jwt from 'jsonwebtoken'
import env from '../config/env.config.js'

function authGroph(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      const error = new Error("JWT must be provided")
      error.status = 401
      throw error;
    }
    const decodedToken = jwt.verify(token, env.ACCESS_TOKEN)
    req.id = decodedToken.id
    req.role = decodedToken.role
    next()
  } catch (error) {
    res.json(error.status || 401).json({error: "JWT error: " + error.message})
  }
}
export default authGroph
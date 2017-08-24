// route middleware that will happen on every request
import jwt from 'jsonwebtoken'
import app from '../app'

const authenticate = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-token']
    if (!token) {
      res.status(400).send({
        message: 'Unauthorised User!'
      })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log(app)
      if (err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        })
      }
      req.decoded = decoded
      next()
    })
  },
  Admin: (req, res, next) => {
    console.log(req.decoded.role)
    if (req.decoded && req.decoded.role === 'Admin') {
      return next()
    }
    return res.status(401).send({
      message: 'Your not Authorized to access this page!'
    })
  }
}

export default authenticate

import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/', routes)

process.env.SECRET_KEY = '#1001-tapsuk-bis-bellal;kajd;lf9u2309ruld;fa '
routes(app)

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello Books v2 '
}))

app.use((req, res, next) => {
  const err = res.status(404).send({
    ERrROR: '404 Page Not Found!'
  })
  next(err)
})

export default app

import db from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const users = db.users

const userController = {
  Register (req, res) {
    users.find({
      where: {
        email: req.body.email
      }
    }).then(found => {
      if (found) {
        res.status(400).send({
          message: 'User already Exist!'
        })
      } else {
        // Validating user input
        if (!req.body.username) {
          res.status(400).send({
            message: 'Please Enter Username'
          })
        } else if (!req.body.email) {
          res.status(400).send({
            message: 'Please Enter Email'
          })
        } else if (!req.body.password) {
          res.status(400).send({
            message: 'Please Enter password'
          })
        } else {
          if (req.body.password === req.body.cpassword) {
            return users
              .create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
              }).then(register => res.status(201).send(register))
              .catch(error => {
                res.status(404).send(error)
              })
          } else {
            res.status(400).send({
              message: 'Password Missmatch!'
            })
          }
        }
      }
    })
  },
  Login (req, res) {
    if (!req.body.email) {
      res.status(400).send({
        message: 'Please enter Your email'
      })
    } else if (!req.body.password) {
      res.status(400).send({
        message: 'Please enter Your Password'
      })
    } else {
      return users
        .findOne({
          where: {
            email: req.body.email
          }
        }).then(found => {
          console.log(found)
          if (!found) {
            res.status(400).send({
              message: 'User does NOT exist!'
            })
          } else if (bcrypt.compareSync(req.body.password, found.password)) {
            console.log(found.role)
            const token = jwt.sign({role: found.role}, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24 // Token expires in 24 hours
            })

            if (found.role === 'Admin') {
              return res.status(200).send({
                message: 'Welcome Admin',
                role: found.role,
                Token: token

              })
            } else {
              return res.status(200).send({
                message: 'Login Successful!',
                role: found.role,
                Token: token
              })
            }
          } else {
            res.status(401).send({
              ERrOR: 'Incorrect Password'
            })
          }
        })
        .catch(error => {
          res.status(404).send(error)
        })
    }
  },

  Health (req, res) {
  //
  }

}

export default userController

import chai from 'chai'
import chaiHttp from 'chai-http'
import models from '../src/models'
import app from '../src/app'

const should = chai.should()
let Users = models.Users
let Books = models.Books

chai.use(chaiHttp)

describe('Users', () => {
  Users = {
    username: 'proxie2',
    email: 'proxie2@x.com',
    password: '1111',
    cpassword: '1111'

  }

  /*
  // [ User ]
  - register user
    - test if user exist
  - login
  - 

  */
   it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send(Users)
      .end((err, res) => {
        res.should.have.status(201)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('username')
        res.body.should.have.property('email')
        res.body.should.have.property('password')
        res.body.should.have.property('role')
        res.body.should.have.property('borrowed')
        res.body.username.should.equal('proxie2')
        // res.body.password.should.equal('moyo');
        res.body.email.should.equal('proxie2@x.com')
        res.body.role.should.equal('User')
        res.body.borrowed.should.equal(0)
        done()
      })
    })

  it('should not let user sign up with the same email twice', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send(Users)
      .end((err, res) => {
        res.should.have.status(400)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('message').equal('User already Exist!')
        done()
      })
  })

  it('should let users sign in /signin POST', (done) => {
    Users = {
      email: 'proxie2@x.com',
      password: '1111'
    }
    chai.request(app)
      .post('/api/v2/users/signin')
      .send(Users)
      .end((err, res) => {
        console.log(res)
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('message').equal('Login Successful!')
        res.body.should.have.property('role').equal('User')
        res.body.should.have.property('Token')
        done()
      })
  })
})

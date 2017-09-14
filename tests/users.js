import chai from 'chai'
import chaiHttp from 'chai-http'
import db from '../src/models'
import app from '../src/app'
import faker from 'faker'

const should = chai.should()
const Users = db.Users
const Books = db.Books
const History = db.History

chai.use(chaiHttp)

describe('Users', () => {
  const Users = {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '1111',
    cpassword: '1111'

  }

  /*
  // [ User ]
  - register user
    - test if user exist
  - login
    - view books
    - borrow book
    - return book 
    - view yet to return 
    * Admin only
      - add book
      - delete book
      - update book

  */
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send(Users)
      .end((err, res) => {
        res.should.have.status(201)
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
    const User = {
      email: Users.email,
      password: '1111'
    }
    chai.request(app)
      .post('/api/v2/users/signin')
      .send(User)
      .end((err, res) => {
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

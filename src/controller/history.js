import db from '../models'

const history = db.history
const book = db.book
const user = db.users
const health = db.health
const currentDate = new Date()
const cur = new Date()
const returnDate = cur.setDate(cur.getDate() + 7) // get 24 days after borrowed date 
const x = new Date()
const graceP = x.setDate(x.getDate() + 2) // set grace preriod to two days
history.belongsTo(book)
book.hasMany(history)

const historyController = {

  Borrow (req, res) {
    console.log('current date: ' + currentDate + ' Return Date: ' + returnDate)
    history.find({
      where: {
        userId: req.params.userId,
        bookId: req.body.bookId
      }
    }).then(found => {
      if (found) {
        res.status(400).send({
          message: 'You have already Borrowed this book'
        })
      } else {
        user.findById(req.params.userId).then(foundUser => {
          if (!foundUser) {
            res.status(404).send({
              message: 'User NOT found!'
            })
          } else {
            if (foundUser.membership === 'Silver') {
              if (foundUser.borrowed >= 3) {
                return res.status(403).send({
                  message: 'Sorry you have rached Your borrowed book limit'
                })
              }
            } else if (foundUser.membership === 'Gold') {
              if (foundUser.borrowed >= 9) {
                return res.status(403).send({
                  message: 'Sorry you have rached Your borrowed book limit'
                })
              }
            } else if (foundUser.membership === 'Green') {
              if (foundUser.borrowed >= 12) {
                return res.status(403).send({
                  message: 'Sorry you have rached Your borrowed book limit'
                })
              }
            }
            book.findById(req.body.bookId).then(foundBook => {
              if (!foundBook) {
                res.status(404).send({
                  message: 'Book NOT Found'
                })
              } else if (foundBook.quantity <= 0) {
                // - make sure the book is available
                res.status(404).send({
                  message: 'This Book is out of stock!'
                })
              } else {
                // Reduce book quantity 
                if (foundBook.quantity !== 0) {
                  book.update({
                    quantity: (foundBook.quantity - 1)
                  }, {
                    fields: ['quantity'],
                    where: {
                      id: req.body.bookId
                    }
                  })
                }
                // Increase borrowed book for user                   
                user.update({
                  borrowed: (foundUser.borrowed + 1)
                }, {
                  fields: ['borrowed'],
                  where: {
                    id: req.params.userId
                  }
                })
                // save data in borrwed history
                return history
                  .create({
                    userId: req.params.userId,
                    bookId: req.body.bookId,
                    date_collected: currentDate,
                    date_due: returnDate
                  }).then(borrwed => res.status(200).send({
                    message: 'Book has been borrowed Successfully!'
                  }))
              }
            })
          }
        })
      }
    }).catch(error => res.status(400).send(error))
  },

  YetToReturn (req, res) {
    user.find({
      where: {
        id: req.params.userId
      }
    }).then(foundUser => {
      if (foundUser.borrowed > 0) {
        return history
          .findAll({
            where: {
              userId: req.params.userId,
              returned: req.query.returned
            }
          }).then(pending => {
            if (pending.length === 0) {
              res.status(200).send({
                message: 'You have returned all books'
              })
            } else {
              res.status(200).send(pending)
            }
          })
      } else {
        res.status(200).send({
          message: 'You have not borrowed any book yet!'
        })
      }
    })
      .catch(error => console.log(error), res.status(400).send({
        message: 'An error occured!'
      }))
  },

  ViewHistory (req, res) {
    return history
      .find({
        where: {
          userId: req.params.userId
        },

        include: [
          {
            model: user,
            where: {
              id: req.params.userId
            },
            as: 'userDetails'
          },
          {
            model: book,
            where: {
              id: req.body.bookId
            },
            as: 'bookInfo'
          }
        ]
      }).then((history) => {
        if (!history) {
          res.status(404).send({
            message: 'You have no History!'
          })
        } else {
          res.status(200).send(history)
        }
      })
      // .catch(error => console.log(error), res.status(400).send({message: 'An error occured!'}))
  },

  Return (req, res) {
    // Now lets return the a book shall we?
    // - fetch book
    return history
      .find({
        where: {
          bookId: req.body.bookId,
          userId: req.params.userId
        }
      }).then(foundHistory => {
        if (!foundHistory) {
          res.status(404).send({
            message: 'Borrowed Book Not found '
          })
          // -- check if book has been returned
          console.log(foundHistory.returned)
        } else if (foundHistory.returned === false) {
          // -- update history table, update return date and retuened
          // Now lets tell the history table that the book has been rturned
          history.update({
            date_returned: currentDate,
            returned: true
          }, {
            where: {
              bookId: req.body.bookId,
              userId: req.params.userId,
              returned: false
            }
          }).then(updated => {
            res.status(200).send({
              message: 'Book has been returned!'
            })
          })
            .catch(error => {
              console.log(error)
              res.status(400).send({error: 'An Error occured!'})
            })
          // -- fetch book
          // -- increase book quantity 
          book.findById(req.body.bookId).then(foundBook => {
            book.update({
              quantity: (foundBook.quantity + 1)
            }, {
              where: {
                id: req.body.bookId
              }
            })
          })
          // -- fetch user 
          // --- reduce borrowed = -1
          user.findById(req.params.userId).then(foundUser => {
            if (!foundUser) {
              res.status(400).send({
                message: 'User not found!'
              })
            } else {
              // Reduce user's borrowed book counter
              if (foundUser.borrowed > 0) {
                user.update({
                  borrowed: (foundUser.borrowed - 1)
                }, {
                  fields: ['borrowed'],
                  where: {
                    id: req.params.userId
                  }
                })
              }
            }
          })

          // - update or create health history
          const gracePeriod = new Date(graceP)
          const dateDue = foundHistory.date_due
          health.find({
            where: {
              userId: req.params.userId
            }
          }).then(found => {
            if (!found) {
              // it dosen't exist in the database 
              // so we simply create either
              if (gracePeriod > dateDue) {
                // create with after_due = 1
                health.create({
                  userId: req.params.userId,
                  before_due: 0,
                  after_due: 1
                })
              // res.send('creating over due')
              } else {
                // create with before_due = 1
                health.create({
                  userId: req.params.userId,
                  before_due: 1,
                  after_due: 0
                })
              // res.send('creating normal')
              }
            } else {
              // we update that row.
              if (gracePeriod > dateDue) {
                // update after_due + 1
                health.update({
                  after_due: found.after_due + 1
                }, {
                  fields: ['after_due'],
                  where: {
                    userId: req.params.userId
                  }
                })
              // res.send('updating Over due')
              } else {
                // update before_due + 1
                health.update({
                  before_due: found.before_due + 1
                }, {
                  fields: ['before_due'],
                  where: {
                    userId: req.params.userId
                  }
                })
              // res.send('updating normal')
              }
            }
          })
        } else {
          res.status(400).send({
            message: 'You have Already Retuened this book!'
          })
        }
      })
  }

}

export default historyController

import db from '../models'

const history = db.history
const book = db.book
const user = db.users
const currentDate = new Date()
const cur = new Date()
const returnDate = cur.setDate(cur.getDate() + 7) // get 24 days after borrowed date 

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
      .findAll({
        where: {
          userId: req.params.userId
        }
      }).then(history => {
        if (history) {
          res.status(200).send(history)
        } else {
          res.status(404).send({
            message: 'You have no history'
          })
        }
      })
      // .catch(error => console.log(error), res.status(400).send({message: 'An error occured!'}))
  },

  Return (req, res) {
    
  }

}

export default historyController

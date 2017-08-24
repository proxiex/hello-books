import db from '../models'

const Book = db.book
const UpdateBook = {
  isbn (req, res) {
    return Book
      .update({
        ISBN: req.body.ISBN
      }, {
        where: {
          id: req.params.bookId
        }
      })
  },
  bookname (req, res) {
    return Book
      .update({
        bookname: req.body.bookname
      }, {
        where: {
          id: req.params.bookId
        }
      })
  },
  author (req, res) {
    return Book
      .update({
        author: req.body.author
      }, {
        where: {
          id: req.params.bookId
        }
      })
  },
  publisher (req, res) {
    return Book
      .update({
        publisher: req.body.publisher
      }, {
        where: {
          id: req.params.bookId
        }
      })
  },
  category (req, res) {
    return Book
      .update({
        category: req.body.category
      }, {
        where: {
          id: req.params.bookId
        }
      })
  },
  quantity (req, res) {
    return Book
      .update({
        quantity: req.body.quantity
      }, {
        where: {
          id: req.params.bookId
        }
      })
  },
  details (req, res) {
    return Book
      .update({
        details: req.body.details
      }, {
        where: {
          id: req.params.bookId
        }
      })
  }
}
const bookContoller = {
  Create (req, res) {
    Book.findOne({
      where: {
        ISBN: req.body.ISBN,
        bookname: req.body.bookname
      }
    }).then(found => {
      if (found) {
        res.status(400).send({
          message: 'Book already Exist!'
        })
      } else {
        if (!req.body.ISBN) {
          res.status(400).send({
            ERrOR: 'Please Enter Book ISBN'
          })
        } else if (!req.body.bookname) {
          res.status(400).send({
            ERrOR: 'Please Enter Book Name'
          })
        } else if (!req.body.author) {
          res.status(400).send({
            ERrOR: 'Please Enter Book Author'
          })
        } else if (!req.body.publisher) {
          res.status(400).send({
            ERrOR: 'Please Enter Book\'s Publisher'
          })
        } else if (!req.body.category) {
          res.status(400).send({
            ERrOR: 'Please Enter Book\'s category'
          })
        } else if (!req.body.quantity || req.body.quantity < 1) {
          res.status(400).send({
            ERrOR: 'Please Enter Book quantity'
          })
        } else if (!req.body.details) {
          res.status(400).send({
            ERrOR: 'Please Enter Book details'
          })
        } else {
          return Book
            .create({
              ISBN: req.body.ISBN,
              bookname: req.body.bookname,
              author: req.body.author,
              publisher: req.body.publisher,
              category: req.body.category,
              quantity: req.body.quantity,
              details: req.body.details
            }).then(createdBooks => res.status(201).send(createdBooks))
            .catch(error => res.status(400).send(error))
          // send({message: 'An error occured!'})
        }
      }
    })
  },

  getAll (req, res) {
    return Book
      .all().then(found => { res.status(200).send(found) })
      .catch(error => res.status(400).send(error))
  },

  Retrive (req, res) {
    return Book
      .findById(req.params.bookId).then(found => {
        if (!found) {
          res.status(404).send({
            message: 'Book not Found!'
          })
        } else {
          res.status(200).send(found)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  Update (req, res) {
    return Book
      .findById(req.params.bookId).then(found => {
        if (!found) {
          res.status(404).send({
            message: 'Book not Found!'
          })
        } else {
          if (req.body.ISBN) {
            UpdateBook.isbn(req, res)
          } else if (req.body.bookname) {
            UpdateBook.bookname(req, res)
          } else if (req.body.author) {
            UpdateBook.author(req, res)
          } else if (req.body.publisher) {
            UpdateBook.publisher(req, res)
          } else if (req.body.category) {
            UpdateBook.category(req, res)
          } else if (req.body.quantity && req.body.quantity > 0) {
            UpdateBook.quantity(req, res)
          } else if (req.body.details) {
            UpdateBook.details(req, res)
          } else {
            res.status(200).send({
              message: 'Nothing to Update!'
            })
          }
          res.status(201).send({
            message: 'Book Updated Successfully!'
          })
        }
      })
      .catch(error => res.status(400).send(error))
  },

  Delete (req, res) {
    Book.findById(req.params.bookId).then(found => {
      if (!found) {
        res.status(404).send({
          message: 'Book Not Found'
        })
      } else {
        // res.send('book found')
        return Book
          .destroy({
            where: {
              id: req.params.bookId
            }
          }).then(() => res.status(200).send({
            message: 'Book Deleted!'
          }))
      }
    })
      .catch(error => console.log(error), res.status(400).send({message: 'An Error Occured!'}))
  }
}

export default bookContoller

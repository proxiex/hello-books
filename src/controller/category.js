import db from '../models'

const Category = db.category

const categoryController = {
  Create (req, res) {
    Category.find({
      where: {
        category: req.body.category
      }
    }).then(found => {
      if (found) {
        res.status(400).send({
          message: 'Category Already Exist!'
        })
      } else {
        console.log(req.body)
        if (req.body.category) {
          return Category
            .create({
              category: req.body.category
            }).then(created => {
              res.status(201).send(created)
            })
        } else {
          res.status(400).send({
            message: 'Please enter a Category'
          })
        }
      }
    })
      .catch(error => console.log(error), res.status(400).send({message: 'An Error Occured!'}))
  }
}

export default categoryController

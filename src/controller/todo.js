import db from '../models'

const Todo = db.Todo
const TodoItem = db.TodoItem

const Todos = {
  Create (req, res) {
    return Todo
      .create({
        title: req.body.title
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error))
  },

  List (req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send({error}))
  }
}

export default Todos

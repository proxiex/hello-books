// ROUTES
// ==============================================
// import app from '../app.js'
import middleware from '../middleware'
import test from '../controller/test'
import bookController from '../controller/books'
import userController from '../controller/users'
import categoryController from '../controller/category'
import historyController from '../controller/history'

export default (app) => {
  app.get('/new', test.all)
  app.get('/set', test.locked)

  // Resigistration and Login Route
  app.post('/api/v2/users/signup', userController.Register)
  app.post('/api/v2/users/signin', userController.Login)

  // Protected Routes - admin only 
  app.post('/api/v2/books', middleware.Verify, middleware.Admin, bookController.Create)
  app.put('/api/v2/books/:bookId', middleware.Verify, middleware.Admin, bookController.Update)
  app.post('/api/v2/category', middleware.Verify, middleware.Admin, categoryController.Create)
  app.delete('/api/v2/books/:bookId', middleware.Verify, middleware.Admin, bookController.Delete)

  // Protected Routes - all users
  app.get('/api/v2/books', middleware.Verify, bookController.getAll)
  app.get('/api/v2/books/:bookId', middleware.Verify, bookController.Retrive)
  app.post('/api/v2/:userId/books', middleware.Verify, historyController.Borrow)
  app.get('/api/v2/users/:userId/books', middleware.Verify, historyController.YetToReturn)
  app.get('/api/v2/users/:userId/books/history', middleware.Verify, historyController.ViewHistory)
  app.put('/api/v2/users/:userId/books', middleware.Verify, historyController.Return)
}

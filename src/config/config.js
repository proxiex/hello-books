const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    username: 'postgres',
    password: '#101bootcamp',
    database: 'hello_book',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST'
  },
  production: {
    username: 'root',
    password: '#101bootcamp',
    database: 'hello_book',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}

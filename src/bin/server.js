// server.js
/*

*/

// BASE SETUP
// ==============================================

// import * as express from 'express';

// This will be our application entry. We'll setup our server here.

import * as http from 'http'
import app from '../app' // The express app we just created
// require('babel-register')
import 'dotenv'

const port = parseInt(process.env.PORT, 10) || 8000
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
console.log('Sever is up and running on port: ' + port + '.....')

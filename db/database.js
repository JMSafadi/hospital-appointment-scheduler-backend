const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting database', error.stack)
    return
  }
  console.log('Connected to mySQL as id ' + connection.threadId)
})

module.exports = connection

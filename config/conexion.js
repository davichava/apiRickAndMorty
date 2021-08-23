const { createPool } = require('mysql')

const connetc = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
})

module.exports = connetc;

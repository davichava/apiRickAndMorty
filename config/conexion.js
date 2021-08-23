const { createPool } = require('mysql')

// se crea la coneccion a la base de datos Mysql
// se digitan las credenciales para la conexion
const connetc = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
})

module.exports = connetc;

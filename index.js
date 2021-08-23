const express = require ('express')
const morgan = require ('morgan')
const cors = require ('cors')

const app = express()
const port = 3000

// Setting
const userRoutes = require('./src/router/userRouters')
const loginRoutes = require('./src/router/loginRoutes')

// Middlwares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({}))

// Router
app.use('/api/user', userRoutes)
app.use('/api/login', loginRoutes)



//Server

app.listen(port, () => {
    console.log(`Server on Port ${port}`);
})
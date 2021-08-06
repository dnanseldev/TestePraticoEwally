const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./api/controller/routes')

const app = express()
const PORT = 8080

app.use(express.json())
app.use( bodyParser.urlencoded( {extended: false} ) )
app.use(routes)



app.listen(PORT, () => {

    console.log('Server is up... :)')
})
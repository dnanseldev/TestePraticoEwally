const express = require('express')
const routes = express.Router()

let db = [
    {'1': {name: 'Customer 01', age: 35}},
    {'2': {name: 'Customer 02', age: 37}},
    {'3': {name: 'Customer 03', age: 28}},
]


routes.get('/', (request, response) => {

    return response.json(db)
})

routes.post('/add', (request, response) => {
  
     const body = request.body

     if(!body)
       return response.status(400).end()

    db.push(body)

    return response.json(db) 
})


module.exports = routes


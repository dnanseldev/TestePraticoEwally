const express = require('express')
const routes = express.Router()

let db = [
    {'1': {name: 'Customer 01', age: 35}},
    {'2': {name: 'Customer 02', age: 37}},
    {'3': {name: 'Customer 03', age: 28}},
]


routes.get('/boleto/:digit_line', (request, response) => {

    let barcode = request.params.digit_line
    let campo1 = barcode.slice(0, 3)

    let fator_validade = barcode.slice(33, 37)
    //let data_validade = Date.parse('07/10/1997') + parseInt(fator_validade)
    
    let data_validade = new Date('07/10/1997') 
    let data_fim =  data_validade.setDate(data_validade.getDate() + parseInt(fator_validade))    

    let valor_boleto = barcode.slice(37, 47)
    response.send(
        '<div>'+fator_validade+'</div>'+
        '<div>'+data_fim.toLocaleString().substring(0,data_fim.toLocaleString().indexOf(' '))+'</div>'+
        '<div>'+valor_boleto+'</div>'
    )
    //return response.json(db)
})

routes.post('/add', (request, response) => {
  
     const body = request.body

     if(!body)
       return response.status(400).end()

    db.push(body)

    return response.json(db) 
})


module.exports = routes


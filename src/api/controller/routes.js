const express = require('express')
const routes = express.Router()

routes.get('/boleto/:digit_line', (request, response) => {

    if ( !isNumeric(request.params.digit_line) )
      // return response.status(400).end()
      return response.json({Erro: 400, message: 'Valor numerico invalido'})

    let barcode = request.params.digit_line
    let fator_validade = barcode.slice(33, 37)    
    let data_validade = new Date(1997, 10, 7) //Data base BACEN '07/10/1997'
    data_validade.setDate(data_validade.getDate() + parseInt(fator_validade))
    let valor_boleto = parseFloat( barcode.slice(37, 47) ) / 100

    const j_boleto = {
        barCode: barcode.slice(0, 43),
        amount: valor_boleto.toLocaleString('pt-br', {minimumFractionDigits: 2}),
        expirationDate: data_validade.toLocaleString().substring(0,data_validade.toLocaleString().indexOf(' '))
    }
    
    return response.json(j_boleto)
   /*
    response.send(
        '<div>'+fator_validade+'</div>'+
        '<div>'+data_validade.toLocaleString().substring(0,data_validade.toLocaleString().indexOf(' '))+'</div>'+
        '<div>'+valor_boleto.toLocaleString('pt-br', {minimumFractionDigits: 2})+'</div>'
    )
    */
    //return response.json(db)
})

routes.get('/teste', (request, response) => {

    const boleto = {
        barCode: 'XXXXXXXXXX',
        amount: '1200',
        expirationDate: new Date('07/10/1997')
    }
    return response.json(boleto) 
})

//----------------------------------------------
function isNumeric(num){
    return !isNaN(num)
  }


module.exports = routes


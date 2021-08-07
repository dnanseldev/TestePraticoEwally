const express = require('express')
const routes = express.Router()
let GetDigitoVerificador = require('../../playground/test')

routes.get('/boleto/:digit_line', (request, response) => {

    //Validação basica se o campo é numérico
    if ( !ENumerico(request.params.digit_line) )         
        return response.json({Erro: 400, message: 'Valor numerico invalido'})      

    let linha_digitavel = request.params.digit_line
    let campo1 = linha_digitavel.slice(0, 9)
    let campo2 = linha_digitavel.slice(10, 20)
    let campo3 = linha_digitavel.slice(21, 31)

    //Validação do boleto
    if(  linha_digitavel[9] === GetDigitoVerificador(campo1) &&
         linha_digitavel[20] === GetDigitoVerificador(campo2) &&
         linha_digitavel[31] === GetDigitoVerificador(campo3) )
       console.log({Sucesso: 200, message: 'Boleto valido'})        
    else
       return response.json({Erro: 400, message: 'Digito Verificador invalido'})

    let fator_validade = linha_digitavel.slice(33, 37)
    let data_validade = new Date(1997, 10, 7) //Data base BACEN '07/10/1997'

    //Somo o fator de validade com data definida pelo BACEN para descobrir a validade do boleto
    data_validade.setDate(data_validade.getDate() + parseInt(fator_validade))

    let valor_boleto =  parseFloat( linha_digitavel.slice(37, 47) ) / 100

    const j_boleto = {
        barCode: campo1 +GetDigitoVerificador(campo1) + campo2 + GetDigitoVerificador(campo2)+campo3 + GetDigitoVerificador(campo3),
        amount: valor_boleto.toLocaleString('pt-br', {minimumFractionDigits: 2}),
        expirationDate: data_validade.toLocaleString().substring(0,data_validade.toLocaleString().indexOf(' '))
    }
    
    return response.json(j_boleto)
   
})


routes.get('/test/:barcode', (request, response) => {

    let linha_digitavel = request.params.barcode
    let campo1 = linha_digitavel.slice(0, 9)
    let campo2 = linha_digitavel.slice(10, 20)
    let campo3 = linha_digitavel.slice(21, 31)
    let fator_validade = linha_digitavel.slice(33, 37) 
    let valor_boleto = linha_digitavel.slice(37, 47) 

    response.send(
        //'<div>'+linha_digitavel+'</div>'+
        '<div>'+'001 9 05009 5 4014481606 9 0680935031 4 3 3737 0000000100'+'</div>'+
        '<div>'+campo1 + GetDigitoVerificador(campo1)+'</div>'+
        '<div>'+campo2+ GetDigitoVerificador(campo2)+'</div>'+
        '<div>'+campo3+ GetDigitoVerificador(campo3)+'</div>'+
        '<div>'+fator_validade+'</div>'+
        '<div>'+valor_boleto+'</div>'        
    )    
    
})

//----------------------------------------------
const ENumerico = num => !isNaN(num)
  


module.exports = routes


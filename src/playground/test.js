let campo1 = '00680935031'

let multiplicador = 2;
let result = 0
let numero_concatenado = 0
let soma = 0

campo1.split('').reverse().forEach(c => {
    
    let n = parseInt(c)
    result = n * multiplicador

    if(result > 9)
    {
        result.toString().split('').forEach(x => {
            numero_concatenado += parseInt(x)
        })
        result = numero_concatenado
        numero_concatenado = 0
    }
    

    soma += result
    
       
    console.log(`R(${result}) M(${multiplicador})`)
   // console.log(`R(${c}) M(${multiplicador})`)

    if (multiplicador === 2)
      multiplicador = 1
    else if( multiplicador === 1)
      multiplicador = 2    
})

console.log('Soma: ' + soma)
console.log('Resto: '+ soma % 10)
let resto = soma % 10
let dv = (Math.ceil(soma/10) * 10) - resto

//dv.toString().split('').reverse()[0]
console.log('DV: '+ dv.toString().split('').reverse()[0])
//Math.ceil(total / pageSize)


/*------------------------------------------------------ */
const GetDigitoVerificador = campo => {

    let multiplicador = 2;
    let result = 0
    let numero_concatenado = 0
    let soma = 0
   
   campo.split('').reverse().forEach(c => {
    
    let n = parseInt(c)
    result = n * multiplicador

    if(result > 9)
    {
        result.toString().split('').forEach(x => {
            numero_concatenado += parseInt(x)
        })
        result = numero_concatenado
        numero_concatenado = 0
    }    

    soma += result

    if (multiplicador === 2)
      multiplicador = 1
    else if( multiplicador === 1)
      multiplicador = 2    
})

   let resto = soma % 10
   let dv = (Math.ceil(soma/10) * 10) - resto
   return dv.toString().split('').reverse()[0]
}

module.exports = GetDigitoVerificador
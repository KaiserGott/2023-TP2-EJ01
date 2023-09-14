const fs = require('fs')

console.log('--- EJ 1.1 LEER ARCHIVO COMO STRING---')
// leerArchivoComoString
// Recibe la ruta del archivo que se quiere leer, y devuelve un único string con todo el contenido
// del mismo.

let datosA = fs.readFileSync('datos.txt','Utf8')
console.log(datosA)
//Uso expresion regular:
//\r = CR (Carriage Returncharacter (ASCII 10)
//\n = LF (Line Feed) → Used as a new line character in Unix/Mac OS X
//\r\n (End Of Line) 
// g modifier: global. All matches (don't return after first match)
// m  modifier: multi line. Causes \r and \ to match the begin/end of each line (not only begin/end of string)
const contenidoSinSaltosDeLineaA = datosA.replace(/(\r\n|\n|\r)/gm, '');

console.log(contenidoSinSaltosDeLineaA)

//-----------------------------------------------------------------------------------------------------

console.log('--- EJ 1.2 CHEQUEAR ARCHIVO Y ESCRIBIR SEGUN FLAG ---')
// Recibe una ruta, un texto, y un flag, y graba ese texto en un archivo en la ruta dada. Si el
// directorio es válido pero el archivo no existe, decide que hacer según el flag:
// ● Con el flag en true, crea el archivo y lo escribe.
// ● Con el flag en false, lanza el error “el archivo no existe”.

function readWriteFsSync(){

const rutaArchivoValido = 'pruebaEj2.txt'    
function escribirDatos(rutaArchivo){
    fs.writeFileSync(rutaArchivo, new Date().toLocaleString())
}

const flagPositivo = true   //Si la ruta no existe, creo el archivo
const flagNegativo = false  //Si la ruta no existe no quiero que cree el archivo

function fileExists(path) {
    console.log('COMIENZO MODULO FILE-EXISTS.')
    try {
            fs.accessSync(path)
            console.log('MP: El path es valido.')
            return true
            // La ruta al archivo existe
        } catch (e) {
            console.error('MP: El path no existe. Es invalido.')
            return false
            // La ruta al archivo no existe
    }
}
   
function readWriteSegunFlag(ruta, escribir, flag){
    let rutaExiste = false
    if (fileExists(ruta)){
        escribir(ruta)
        console.log('RWSF: Archivo Escrito')
        rutaExiste = true
    }

    else if (!rutaExiste && flag){
        escribir(ruta)
        console.log(`RWSF: Archivo nuevo creado ${ruta} y escrito`)
    }
        
    else if (!rutaExiste && !flag){
        console.log(`No existe la ruta ${ruta} y no se crea el archivo.`)
    }
}

console.log("Test 1: Archivo Valido.")
readWriteSegunFlag(rutaArchivoValido, escribirDatos, flagNegativo)
console.log("Test 2: Ruta invalida No crear")
readWriteSegunFlag("rutaInvalidaNoCrear.txt", escribirDatos, flagNegativo)
console.log("Test 3: Ruta invalida. Se debe crear.txt")
readWriteSegunFlag("rutaInvalidaCrear.txt", escribirDatos, flagPositivo)
}

readWriteFsSync()

//-----------------------------------------------------------------------------------------------------

console.log('--- EJ 1.3 transformarStringEnArrayDeNumeros ---')
/*Recibe un texto y una secuencia de caracteres que usará como separador. Devuelve un array
con todos los números producto de partir el texto cada vez que aparezca la secuencia
separadora. En el caso de que alguna de las partes no sea numérica, no se incluirá en el
resultado, pero no debe lanzar ningún error.
Ejemplo
Input: texto = ‘123 | 456 | 789 | 1bc | 10’ , separador = ‘ | ’
Output: [123, 456, 789, 10]
*/

let inputcadenaDeTextoTest1 = '123 | 456 | 789 | 1bc | 10'

let separadorTexto = ' | '


function transformarStringEnArrayDeNumeros(datosString, separador){
    // uso split con el argumento del separador para sacar los " | " y crear un array con los valores. 
    let stringSinSeparador = datosString.split(separador)  
    let arrayNumeros = []

    for (let i = 0; i < stringSinSeparador.length; i++){
        let supuestoNumero = stringSinSeparador[i]
        if (!isNaN(supuestoNumero)){
            arrayNumeros.push(parseFloat(supuestoNumero)) // el parseFloat o parseInt convierte el string a numero.
        }
    }
    return arrayNumeros
}

console.log("Test 1: Archivo Base a numero.")
console.log(`El string base es : ${inputcadenaDeTextoTest1}`)
console.log("Resultado de la conversion:")
console.log(transformarStringEnArrayDeNumeros(inputcadenaDeTextoTest1, separadorTexto))

console.log('--- EJ 1.4 transformarArrayDeNumerosAUnSoloString ---')
/*Recibe un array con strings, y una secuencia de caracteres para usar como separador.
Devuelve un único string que es la unión de todos los strings del array, intercalando la
secuencia separadora entre cada uno.
Ejemplo
Input: array = [123, 456, 789, 10] , separador = ‘,’
Output: ‘123,456,789,10’
*/

let inputArrayNumeros = [123, 456, 789, 10]

let separadorNumeros = ','

function transformarArrayDeNumerosEnString(datosNumeros, separador){
    let arrayString = datosNumeros.sort(function (a,b) {return (a-b)})
    return arrayString.join(separador)
   }   

let inputArrayNumerosTest2 = [123,123,456,456,789,10,10]

console.log("Test 1: Archivo Base de array de numeros a Cadena String.")
console.log(`El array de numeros base es : ${inputArrayNumeros}`)
console.log("Resultado de la conversion:")
console.log(transformarArrayDeNumerosEnString(inputArrayNumeros, separadorNumeros))
console.log("Test 2: Otro array de numeros a Cadena String.")
console.log(`El array de numeros test2 es : ${inputArrayNumerosTest2}`)
console.log("Resultado de la conversion:")
console.log(transformarArrayDeNumerosEnString(inputArrayNumerosTest2, separadorNumeros))

console.log('--- EJ 1.5 combinarDosArraysNumericos ---')

/*Recibe dos arrays, ambos con datos de tipo numérico, ambos ordenados en forma ascendente,
y sin repetidos dentro de cada archivo (puede haber repetidos entre un archivo y otro).
Devuelve un nuevo array, que contenga todos los datos de ambos arrays, también ordenados
en forma ascendente, y también sin repetidos.
Ejemplo
Input: array1 = [1, 5, 10] , array2 = [2, 3, 8, 11]
Output: [1, 2, 3, 5, 8, 10, 11]
Observación
Si se te ocurrió una solución que requiere poder ordenar un array, pensá en otra forma de
hacerlo.
*/

let arrayNumeros1 = [1, 5, 10]
let arrayNumeros2 = [2, 3, 8, 11]

function combinarDosArraysNumericos(array1,array2){
    let miSet = new Set (array1.concat(array2)) //creo un objeto SET
    let arrayMiSet = ([...miSet]); //convierto el set a un array
    arrayMiSet.sort((a,b) => {return (a-b)}) //lo ordeno de manera ascendente
    return arrayMiSet

}


console.log("Test 1: Arrays Base.")
console.log(`El array N° 1 es: ${arrayNumeros1} y el N° 2 es: ${arrayNumeros2}`)
console.log("Resultado de la conversion:")
console.log(combinarDosArraysNumericos(arrayNumeros1, arrayNumeros2))
console.log("Test 2: 2 Arrays con numeros repetidos.")
console.log(`El array N° 1 es: ${[1,4,6,9,9]} y el N° 2 es: ${[9,4,1,5,3]}`)
console.log("Resultado de la conversion:")
console.log(combinarDosArraysNumericos([1,4,6,9,9], [9,4,1,5,3]))




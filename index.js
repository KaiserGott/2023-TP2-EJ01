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

console.log('--- EJ 1.2 CHEQUEAR ARCHIVO Y ESCRIBIR---')
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



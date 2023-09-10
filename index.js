const { isUtf8 } = require('buffer')
const fs = require('fs')

console.log('--- EJ 1.1 LEER ARCHIVO COMO STRING---')
// leerArchivoComoString
// Recibe la ruta del archivo que se quiere leer, y devuelve un único string con todo el contenido
// del mismo.

let datos = fs.readFileSync('datos.txt','Utf8')
console.log(datos)
//Uso expresion regular:
//\r = CR (Carriage Returncharacter (ASCII 10)
//\n = LF (Line Feed) → Used as a new line character in Unix/Mac OS X
//\r\n (End Of Line) 
// g modifier: global. All matches (don't return after first match)
// m  modifier: multi line. Causes \r and \ to match the begin/end of each line (not only begin/end of string)
const contenidoSinSaltosDeLinea = datos.replace(/(\r\n|\n|\r)/gm, '');

console.log(contenidoSinSaltosDeLinea)


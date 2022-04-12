/** @format */
//Comando pare compilar ejecutable: pkg serverhttp.js --targets node12-win-x64
const http = require("http");
const fs = require("fs");
var os = require("os");

const port = 9000;

const CB_FuenteDelTexto = String.fromCharCode(29) + "f" + String.fromCharCode(1);
// Gs + "H" + dos = Es la Posicion del Texto 0=None;1=Arriba;2=Abajo;3=arriba y Abajo
const CB_FuentePosicion = String.fromCharCode(29) + "H" + String.fromCharCode(2);
//Gs + "h" + sesenta = Alto del Codigo de barra 1 a 255
const CB_Alto = String.fromCharCode(29) + "h" + String.fromCharCode(60);
// Gs + "w" + dos = Ancho Codigo de Barra 1 a 6
const CB_Ancho = String.fromCharCode(29) + "w" + String.fromCharCode(2);
// Gs + "k" + dos 0=UPC-A;1=UPC-E;2=JAN13(EAN13);3=JAN8(EAN8);4=CODE39;5=ITF
const CB_Tipo = String.fromCharCode(29) + "k" + String.fromCharCode(4);
// Gs + "V" + 0 o 1
const CB_Corte = String.fromCharCode(29) + "V" + String.fromCharCode(0);
// ESC + "a" + 0 ,1,2
const CB_Alinear = String.fromCharCode(27) + "a" + String.fromCharCode(1);
// ESC + "V" + 0 o 1
const CB_Rotacion = String.fromCharCode(27) + "V" + String.fromCharCode(0);

const espaciado = String.fromCharCode(27) + String.fromCharCode(50);
const interlineado = String.fromCharCode(27) + String.fromCharCode(51) + String.fromCharCode(10);

//ESC + "t" + 18
const reset = String.fromCharCode(27) + "@";
const latin = String.fromCharCode(27) + String.fromCharCode(82) + "FF";
var hostname = os.hostname();

http.createServer((req, res) => {
    let body = [];
    req.on("error", (err) => {
        console.error(err);
    })
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            const visita = JSON.parse(body);
            //console.log(body);
            if (visita) {
                var stream = fs.createWriteStream("\\\\" + hostname + "\\Termica");
                stream.write(reset);
                //Printer.Wr("012345678901234567890123456789012345678901");
                stream.write("       Ingreso a UOCRA - O.S.Pe.Con");
                stream.write("\r\n\r\n");
                stream.write("   VISITANTE: " + visita.apellido + " " + visita.nombre + "\r\n");
                stream.write("   DNI: " + visita.documento + "\r\n");
                stream.write("\r\n");
                stream.write("  ========================================  \r\n");
                stream.write("   Visita a: " + visita.legajo + "\r\n");
                stream.write("   Sector: " + visita.sector + "\r\n");

                stream.write("   Fecha: " + visita.entrada.substr(0, 10) + "  ");
                stream.write("   Hora : " + visita.entrada.substr(11, 8) + "\r\n");
                stream.write("\r\n\r\n");
                stream.write("   Hora Egreso: " + "");

                stream.write("\r\n\r\n\r\n\r\n\r\n");
                stream.write("                           _______________  ");
                stream.write("                               Firma        \r\n\r\n");

                stream.write("\r\n");
                stream.write("\r\n");
                stream.write("\r\n");

                stream.write(CB_Corte);
                stream.end("");
            }
            res.end();
        });
}).listen(port, () => {
    console.log(`Server is running on port :${port}`);
});

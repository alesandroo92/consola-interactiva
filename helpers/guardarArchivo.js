const fs = require("fs");
const archivo = "./db/data.json";

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data)); // convierte un objeto a su version json valdia como un string
}

const leerDB = () => { 
    if(!fs.existsSync(archivo)) { // para saber si el archivo existe
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: "utf-8"}); // // si existe almacena todo lo que se encuentra en el fs para leerlo de manera asincrona, el encoding es para que no me regrese los bytes
    const data = JSON.parse(info); // para que la funcion leerDB regrese mi arreglo

    console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}
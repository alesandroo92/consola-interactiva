const { v4: uuidv4 } = require("uuid");
class Tarea {
    id = "";
    descripcion = "";
    completadoEn = null;

    constructor(descripcion) { // El constructor es lo que se va a ejecutar cuando creemos una nueva instancia de nuestra tarea
        this.id = uuidv4(); // Esto va a generar algo de manera asincrona el id unico 
        this.descripcion = descripcion;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
const Tarea = require("./tarea");

class Tareas { // creamos una clase
    _listado = {}; // propiedad llamada listado

    get listadoArray() { // usamos un get para retornar un nuevo arreglo
        
        const listado = [];
        Object.keys(this._listado).forEach(key => { // esto me va a regresar un arreglo de todas las llaves
            const tarea = this._listado[key];
            listado.push(tarea);
        }); 

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
       if(this._listado[id]) {
           delete this._listado[id]; // esto es para eliminar la propiedad del objeto
       }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(descripcion = "") {

        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArray.forEach((tarea, i) => {
           const idx = `${i + 1}`.green;
           const {descripcion, completadoEn} = tarea;
           const estado = (completadoEn)
                          ? "Completada".green
                          : "Pendiente".red;
           console.log(`${idx} ${descripcion} :: ${estado}`) ;              
        });

    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArray.forEach(tarea => {
           
           const {descripcion, completadoEn} = tarea;
           const estado = (completadoEn)
                          ? "Completada".green
                          : "Pendiente".red;
           if(completadas) {
               // mostrar completadas
               if(completadoEn) {
                contador += 1;   
                console.log(`${(contador + ".").green} ${descripcion} :: ${completadoEn.green}`) ; 
               }
           }else {
               // mostrar pendientes
               if(!completadoEn) {
                contador += 1;   
                console.log(`${(contador + ".").green} ${descripcion} :: ${estado}`) ; 
               }
           }  

                        
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString() // genera la fecha completamente
            }
        });

        this.listadoArray.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
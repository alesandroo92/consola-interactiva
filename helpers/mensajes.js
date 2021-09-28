require("colors"); // para poder ejecutar el paquete de colores

const mostrarMenu = () => {
    return new Promise(resolve => {
        
        console.clear();
        console.log("==========================".green);
        console.log("  Seleccione una opción".green);
        console.log("==========================\n".green); // \n salto de linea
        // Crear menu //
        console.log(`${"1.".green} Crear tarea`);
        console.log(`${"2.".green} Listar tareas`);
        console.log(`${"3.".green} Listar tareas completadas`);
        console.log(`${"4.".green} Listar tareas pendientes`);
        console.log(`${"5.".green} Completar tarea(s)`);
        console.log(`${"6.".green} Borrar tarea`);
        console.log(`${"0.".green} Salir\n`);
        // Recibir informacion del usuario //
        const readline = require("readline").createInterface({ // preparar la interfaz para presentarsela al usuario
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question("Seleccione una opción: ",(opt) => { // dentro del () esta la respuesta del usuario, opt de option seleccionada
            readline.close(); // si no lo cerramos se va a quedar esperando informacion del usuario
            resolve(opt); // lo que la persona escriba lo mando aca
        })
    });

}
    
// Pausar la aplicacion //
const pausa = () => {
    return new Promise(resolve => {
        const readline = require("readline").createInterface({ // preparar la interfaz para presentarsela al usuario
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${"ENTER".green} para continuar\n`,(opt) => { // dentro del () esta la respuesta del usuario, opt de option seleccionada
            readline.close(); // si no lo cerramos se va a quedar esperando informacion del usuario
            resolve();
        })
    });
    
}

module.exports = { // para exportarlo y poder usarlo en otro archivo (app.js)
    mostrarMenu,
    pausa
};
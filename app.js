require("colors"); // estamos importando el paquete de colores

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, // estamos sacando estas funciones u objetos que se encuentran en el archivo detallados
        pausa,
        leerImput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas"); // estamos importando Tareas de lo que exportemos en la ruta detallada

const main = async() => {
   
   let opt = "";
   const tareas = new Tareas();

   const tareasDB = leerDB();

   if(tareasDB) { // cargar tareas
      tareas.cargarTareasFromArray(tareasDB);
   }
  

   do {
      // imprimir el menu
    opt = await inquirerMenu(); // el await porque inquirerMenu regresa una promesa / esto imprime el menu y retorna una opcion
    
    switch (opt) {
       case "1":
          // crear opcion
          const descripcion = await leerImput("Descripcion:");
          tareas.crearTarea(descripcion);
       break;

       case "2":
          tareas.listadoCompleto();
          
       break;

       case "3": // listar completadas
          tareas.listarPendientesCompletadas(true);
          
       break;

       case "4": // listar pendientes
          tareas.listarPendientesCompletadas(false);
          
       break;

       case "5": // completado | pendiente
          const ids = await mostrarListadoChecklist(tareas.listadoArray);
          tareas.toggleCompletadas(ids);
          
       break;

       case "6": // borrar
          const id = await listadoTareasBorrar(tareas.listadoArray);
          if(id !== "0") {
            const ok = await confirmar("¿Está seguro?");
            if(ok) {
               tareas.borrarTarea(id);
               console.log("Tarea borrada");
            }
          }
          
          
       break;
    
      
    }

    guardarDB(tareas.listadoArray);
    
   
    await pausa();
    
   } while (opt !== "0");
   
   //pausa(); // para detener la aplicacion 

}

main();

const inquirer = require("inquirer");
require("colors");

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: "1",
                name: `${"1.".green } Crear tarea`
            },
            {
                value: "2",
                name: `${"2.".green } Listar tareas`
            },
            {
                value: "3",
                name: `${"3.".green } Listar tareas completadas`
            },
            {
                value: "4",
                name: `${"4.".green } Listar tareas pendientes`
            },
            {
                value: "5",
                name: `${"5.".green } Completar tarea(s)`
            },
            {
                value: "6",
                name: `${"6.".green } Borrar tarea`
            },
            {
                value: "0",
                name: `${"0.".green } Salir`
            },
        ]

    }
];



const inquirerMenu = async() => {

    console.clear();
    console.log("==========================".green);
    console.log("  Seleccione una opción".white);
    console.log("==========================\n".green); // \n salto de linea

    const { opcion } = await inquirer.prompt(preguntas); // Para hacer una pregunta, la respues se guardara en la constante opcion
    return opcion;
}

const pausa = async () => {
   const question = [
       {
           type: "input",
           name: "enter",
           message: `Presione ${"enter".green} para continuar`
       }
   ];
   console.log("\n")
   await inquirer.prompt(question);
}

const leerImput = async(message) => {
   const question = [
       {
           type: "input",
           name: "descripcion",
           message, // se deja vacio porque es lo mismo que tener message = message
           validate(value) {
               if(value.length === 0) {
                   return "Por favor ingrese un valor";
               }
               return true; // la validacion paso
           }
       }
   ];

   const { descripcion } = await inquirer.prompt(question);
   return descripcion;
}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => { // el map retorna un nuevo arreglo pero transformando los hijos
        const idx = `${i + 1}.`.green;
         
        return {
             value: tarea.id,
             name: `${idx} ${tarea.descripcion}`
         }

    });

    choices.unshift({ // lo añadie al inicio del arreglo
        value: "0",
        name: "0.".green + "Cancelar"
    });
    
    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices // es igual que decir choices: choices
        }
    ]
    
    const { id } = await inquirer.prompt(preguntas);
    return id;
    
}

const confirmar = async(message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => { // el map retorna un nuevo arreglo pero transformando los hijos
        const idx = `${i + 1}.`.green;
         
        return {
             value: tarea.id,
             name: `${idx} ${tarea.descripcion}`,
             checked: (tarea.completadoEn) ? true : false
         }

    });

    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices 
        }
    ]
    
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
    
}

module.exports = {
    inquirerMenu,
    pausa,
    leerImput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
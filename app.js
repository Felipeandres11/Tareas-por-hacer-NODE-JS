import colors from 'colors';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} from './helpers/inquirer.js';
import {Tareas} from './models/tareas.js'
import {guardarDB, leerDB} from './helpers/guardarArchivo.js'
// import { pausa } from './helpers/mensajes.js'

const main = async() => {
    let opcion = '';
    const tareas = new Tareas();

    const tareasDB = await leerDB();
   

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)
    }


    do{
        //IMPRIMIR EL MENU
        opcion = await inquirerMenu();
       

        //al elegir una opcion del menu, este retorna un valor numerico que entra en este ciclo
        switch (opcion) {
            case '1':
                const descripcion = await leerInput('Descripcion: ');
                tareas.crearTarea(descripcion)
                break;
            case '2':
                console.log(tareas.listadoCompleto())
            break;

            case '3':
                console.log(tareas.listadoCompletadasPendientes("Completada"))
            break;

            case '4':
                console.log(tareas.listadoCompletadasPendientes("Pendiente"))
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.ListadoArr)
                tareas.toggleCompletadas(ids)
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.ListadoArr)
                if(id !== '0'){
                    const confirmacion = await confirmar('¿Desea eliminar la tarea?')
                    if(confirmacion){
                        tareas.borrarTarea(id);
                        console.log('tarea borrada')
                    }
                }
               
            break;
            case '7':
            
            break;

            default:
                break;
        }

       guardarDB(tareas.ListadoArr);
       await pausa();

    }while(opcion!== '0')
}

main();
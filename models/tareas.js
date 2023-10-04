import { v4 as uuidv4 } from 'uuid';
import {Tarea} from '../models/tarea.js'
import colors from 'colors'

class Tareas {
    _listado = {};
    
    get ListadoArr(){
       const listado = []
       Object.keys(this._listado).forEach(key => {
           const tarea = this._listado[key];
           listado.push(tarea)
       });
       return listado;
    }
    
    constructor(){
        this._listado = {};
    }
    
    borrarTarea(id = ''){
        
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(descripcion){
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea; 
    }

    listadoCompleto(){
        let contador = 0;
        this.ListadoArr.forEach(tarea => {
            tarea.completadoEn = tarea.completadoEn ? 'Completada' : 'Pendiente';
            console.log(`${`${contador + 1}.`.green} ${tarea.descripcion} :: ${tarea.completadoEn} `)
            contador = contador + 1
        })
    }

    listadoCompletadasPendientes(completada = "Completada"){
        let contador = 0;
        let prueba = this.ListadoArr.filter( tarea => 
                tarea.completadoEn === completada
        ).map((x)=>{
            let estado = x.completadoEn == 'Completada' ? x.completadoEn.green : x.completadoEn.red
            console.log(`${`${contador + 1}.`.green} ${x.descripcion} :: ${estado} `)
        })
    }
    
    toggleCompletadas(ids = []){
        
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(tarea.completadoEn === 'Pendiente'){
                tarea.completadoEn = 'Completada'
            }
        })

        this.ListadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = 'Pendiente'; 
            }
        })

    }

  
}

export {Tareas}
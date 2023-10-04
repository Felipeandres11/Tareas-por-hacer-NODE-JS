import fs from 'fs'; //import file system

const archivo = './database/data.json'

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}
const leerDB = async() => {
    
    if(!fs.existsSync(archivo)){
        return null
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info)
    console.log(data)
    return data;
}
export {guardarDB, leerDB};
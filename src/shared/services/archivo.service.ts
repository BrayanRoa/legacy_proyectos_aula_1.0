import { FilesInterface } from "../interfaces/files.interface";
import { v4 as uuid } from "uuid";
uuid();

const path = require("path");

export class Archivo {
  guardarArchivo(file: FilesInterface) {
    return new Promise((resolve, reject)=>{
      const name = file.name.split(".");
      const nombreTemp = `${uuid()}.${name[name.length - 1]}`; // aniunin-iainia-iusniun-jiin.xls
      const uploadPath = path.join(__dirname, "../../uploads/", nombreTemp);
  
      file.mv(uploadPath, (err: any) => {
        if (err) {
          reject(err)
        }
          resolve(uploadPath)
      });
    })
    
  }
}

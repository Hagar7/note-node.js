import multer from "multer"
import { nanoid } from "nanoid"
import path from 'path'
import { fileURLToPath } from "url"
import fs from "fs"


const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const valodationObject = {
    image:["image/png", "image/jpeg" ],
    file:['application/pdf']
}

export const mymulter = ({
    customValidation=valodationObject.image,
    customPath= 'general'
     }={})=>{

const fullPath = path.join(__dirname,`../uploads/${customPath}`)
if(! fs.existsSync(fullPath)){
    fs.mkdirSync(fullPath,{recursive:true});
}


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,fullPath)
    },
    filename:(req,file,cb)=>{
        const uniqueName = nanoid(5) + "__" + file.originalname;
       cb(null,uniqueName)
    }
})
const fileFilter = (req,file,cb)=>{
    if(customValidation.includes(file.mimetype)){
       return cb(null,true)
    }
     cb(new Error("invalid file type",{cause:400}),false)
}

const upload = multer({fileFilter,storage});
return upload;
}
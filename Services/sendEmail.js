
import nodemailer from 'nodemailer';


export const sendEmail =async ({to="",message="",subject=""})=>{

    let transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 587,
        secure:false,
        service:'gmail',
        auth:{
            user:'hagar.14.ha@gmail.com',
            pass:"bgwasvkbzniztzzg"
        }
    })

    let infoMil =await transporter.sendMail({
        from: 'hagar.14.ha@gmail.com',
        to,
        subject,
        html:message,
    })

    console.log(infoMil);

}
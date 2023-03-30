const Io = require("../utils/Io")
const DataAuth = new Io("src/database/auth.json")
const {Auth} = require("../models/auth.js")
const bcrypt = require("bcrypt")
const Joi = require("joi")


const PostRegister = async (req,res)=>{
try{
    const {username,password} = req.body

    const registers = await DataAuth.read()
    const scheme = Joi.object({
        username:Joi.string().alphanum().min(3).max(10).required(),
        password:Joi.string().alphanum().required()
    })
    const id = (registers[registers.length - 1]?.id || 0) + 1

    const hashedpassword = await bcrypt.hash(password,12)
    
    const newRegister = new Auth(id,username,hashedpassword)
    const {error} = scheme.validate(username,password)
    
    const allregister = registers.length ? [...registers,newRegister] : [newRegister]
   
    DataAuth.write(allregister)
    console.log(Auth);
    if(error){
       res.status(400).json({message:error.message})
    }else
    res.status(200).json({message:"added"})
    
} catch(error){
    console.log(error.message);
}

}
const PostLogin = async(req,res)=>{
try{
    const{username, password} = req.body
    const logins = await DataAuth.read()
    const hashed = logins.find((e)=>
       e.password) 
    const compare = await bcrypt.compare(password, hashed)

   const foundUser =  logins.filter( async(e)=> 
   e.username ==  username && compare === true 
   );
   if(foundUser){
    res.status(200).json({message: "muvofaqiyatli logindan otdingiz"})
   }else if(!foundUser){
    res.status(404).json({message: "login yoki parol xato"})
   }
    
   

}catch(error){
    console.log(error.message);
}

}
module.exports = {PostRegister,PostLogin}




  // const checking = hashedPassword.includes((e)=>{
    //     const result = e.hashed ===true ? 
    // })
    
    // if(error){
    //     res.status(400).json({message:error.message})







      //  if(e === true){
    //     
    //     console.log(result);
    //     return result
    //  }else{
    //     res.status(400).json({message:"Uzur sizning parolingiz xato"})
    //  }
       
     
    //  if(rendering === true){
    //     res.status(200).json({message:"Tabriklaymiz sizning loginingiz togri"})
    //   }


     // const scheme = Joi.object({
    //     username:Joi.string().required(),
    //     password:Joi.string().required()
    // })

    // const {error} = scheme.validate(username,password)
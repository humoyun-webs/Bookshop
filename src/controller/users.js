const  {User}  = require("../models/user.js");
const Io = require("../utils/Io");
const UsersDb = new Io("src/database/users.json");




const usersPost = async (req, res) => {
  try {
    const { name, age ,money } = req.body;
    const histories = await Histories.read();
    const users = await UsersDb.read();
    const id = (users[users.length - 1]?.id || 0) + 1;

    const newUsers = new User(id, name, isAdmin =false , isDelete =false, money, age);

    const allUsers = users.length ? [...users, newUsers] : [users]

    UsersDb.write(allUsers);
    res.status(200).json({message:"added succsesfull"})
  } catch (error) {
    if (error) {
      console.log(error.message);
    }
  }
};


const usersGetBYid = async (req, res) => {
    try {
        const {id} = req.params
     const users = await UsersDb.read()
     const user = users[id -1]
     const allusers = users.filter((el)=>{
        if(el.id == user.id){
            return el
        }
     })
     
     res.status(200).json(allusers)
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  };
  const allUsers = async (req, res) => {
    try {
       
     const users = await UsersDb.read()
    
     
     res.status(200).json(users)
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  };


  const putUsers = async (req,res)=>{
    try{
        const {name, age, money, } = req.body
   const {id} = req.params;
   const users =await UsersDb.read()
   const user = users[id - 1]
   const allUsers = users.map((el)=>{
      if(el.id == user.id){
        user.name = name ? name : user.name;
        user.age = age ? age : user.age;
        user.money = money ? money : user.money;
 
      }
      return el
   })
   UsersDb.write(allUsers)
   res.status(200).json({message:"editing successfull"})
    }catch(error){
console.log(error.message);
    }
  }

  const deleteUsers = async (req,res)=>{
try{
    const {id} = req.params
    const users = await UsersDb.read()
    const user = users[id - 1]
    const allUsers = users.map((el)=>{
    if(el.id == user.id){
        user.isDelete = true
    }
    return el
    })
    UsersDb.write(allUsers)
    res.status(200).json({message:"delete successfull"})
}catch(error){
console.log(error.message);
}
  }

module.exports = {usersPost,usersGetBYid,allUsers,putUsers,deleteUsers}

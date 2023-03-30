class User{
    id;
    age;
    name;
    isAdmin;
    isDelete;
    status;
    money;
    constructor(id,name,isAdmin =false,isDelete =false,status,money =500,age){
this.id = id
this.name = name
this.isAdmin = isAdmin
this.isDelete = isDelete
this.status = status
this.money = money
this.age = age
    }

}
module.exports = {User};
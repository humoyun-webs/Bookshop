class Auth{
    id;
    username;
    password;

    constructor(id,username,password){
        this.id = id;
        this.username = username;
        this.password = password
    }
}
module.exports = {Auth}
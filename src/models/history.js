class History{
    id;
    user;
    book;
    status;
    isDelete;
    date;
    count;
    constructor(id,isDelete,user,book,status,date = new Date().toLocaleString(),count){
this.id = id
this.count = count
this.user = user
this.status =status
this.isDelete = isDelete
this.book = book
this.date = date
    }
}
module.exports = {History}
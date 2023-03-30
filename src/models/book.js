class Book {
    id;
    name;
    price;
    count;
    about;
    author;
     isDelete;
     user;
     Image;
     ImageLink
    constructor(id, name, price, count, about, author, isDelete = false , user,Image,ImageLink){
        this.id = id
        this.name = name
        this.price = price
        this.count = count
        this.about = about
        this.author = author
        this.isDelete = isDelete
        this.user = user
        this.Image = Image
        this.ImageLink = ImageLink
    }
}

module.exports = {Book}
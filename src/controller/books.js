const { Book } = require("../models/book.js");
const {History} = require("../models/history.js")
const Io = require("../utils/Io");
const BooksDb = new Io("src/database/books.json");
const Histories = new Io("src/database/history.json")



const {v4:uuid} = require("uuid")



const postBook = async (req, res) => {
    try {
      const { name, price, count, about, author, user,status,} = req.body;
      const {Image} =req.files;
      const histories = await Histories.read();
      const books = await BooksDb.read();
      
      const format = Image.mimetype.split("/")[1];
      const path = `${process.cwd()}/upload/${uuid()}.${fogrmat}`;
      const id = (books[books.length - 1]?.id || 0) + 1;
      const method = req.body.status = "METHOD: POST; Kitob qoshildi";
      const ImageLink = `${process.cwd()}"upload"${Image.name}.${format}`;
      const newHistory = new History(method,req.body.name)
      const newBooks = new Book(id, name,  price, count, about, author, user, isDelete =false,status,ImageLink,);

      const allHistories = histories.length ? [...histories, newHistory] : [histories];
      const allBooks = books.length ? [...books, newBooks] : [newBooks];
     
      Histories.write(allHistories)
      BooksDb.write(allBooks);
      Image.mv(path)
      res.status(200).json({message:"added succsesfull"})
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  };
  
  
  const booksGetBYid = async (req, res) => {
      try {
          const {id} = req.params
       const books = await BooksDb.read()
       const book = books[id -1]
       const allbooks = books.filter((el)=>{
          if(el.id == book.id){
              return el
          }
       })
       
       res.status(200).json(allbooks)
      } catch (error) {
        if (error) {
          console.log(error.message);
        }
      }
    };
    const allBooks = async (req, res) => {
      try {
         
       const books = await BooksDb.read()
      
       
       res.status(200).json(books)
      } catch (error) {
        if (error) {
          console.log(error.message);
        }
      }
    };
  
  
    const putBooks = async (req,res)=>{
      try{
          const {name, age, money, } = req.body
     const {id} = req.params;
     const books =await BooksDb.read()
     const book = books[id - 1]
     const allBooks = books.map((el)=>{
        if(el.id == book.id){
          book.name = name ? name : book.name;
          book.age = age ? age : book.age;
          book.money = money ? money : book.money;   
        }
        return el
     })
     BooksDb.write(allBooks)
     res.status(200).json({message:"editing successfull"})
      }catch(error){
  console.log(error.message);
      }
    }
  
    const deleteBooks = async (req,res)=>{
  try{
      const {id} = req.params
      const books = await BooksDb.read()
      const book = books[id - 1]
      const allBooks = books.map((el)=>{
      if(el.id == book.id){
          book.isDelete = true
      }
      return el
      })
      BooksDb.write(allBooks)
      res.status(200).json({message:"delete successfull"})
  }catch(error){
  console.log(error.message);
  }
    }

module.exports = {postBook,allBooks,deleteBooks,putBooks,booksGetBYid}

// name, price, count, about, author, book 
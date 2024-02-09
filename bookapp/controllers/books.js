const defaultList = require('../utils/constants');
const Book = require('../models/book');


// Добавление defaultList книг
module.exports.addBooks = async () => {
    try {
      for (const book of defaultList) {
        const existingBook = await Book.findOne({ title: book.title });
        if (!existingBook) {
          await Book.create(book);
          console.log(`Книга "${book.title}" успешно добавлена в базу данных`);
        } else {
          console.log(`Книга "${book.title}" уже существует в базе данных`);
        }
      }
    } catch (error) {
      console.error('Ошибка при добавлении книг:', error);
    }
  };
 
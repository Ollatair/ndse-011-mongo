const defaultList = require('../utils/constants');
const Book = require('../models/book');

const PORT = process.env.CNT_PORT || 3002;
const BASE_URL = process.env.BASE_URL || "http://counterapp";


// index — просмотр списка всех книг (вывод заголовков);
module.exports.renderIndex = (req, res) => {
  Book.find()
  .then((books) => res.status(200).render('books/index', {
    title: 'Книги',
    books,
  }))
  .catch((e) => {
    console.log(e);
  });
};

// создать книгу
module.exports.renderCreate = (req, res) => {
  res.render('books/create', {
    title: 'Книга | добавить',
    book: {},
  });
};

// создать книгу
module.exports.createBook = (req, res) => {
  const {
    title, description, authors, favorite,
    fileCover, fileName
  } = req.body;
  if (req.file) {
    const { path } = req.file;
    fileBook = path;
  }
  Book.create({
    title, description, authors, favorite,
    fileCover, fileName, fileBook
  }).then(() => res.redirect('/books'))
    .catch((e) => {
        console.log(e); 
    });
};

// создать книгу
module.exports.renderView = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).orFail();
    let cnt = 0;
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/counter/${id}/incr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      cnt = data.cnt;
    } catch (error) {
      console.log(error);
    }
    res.render('books/view', {
      title: `Книга | ${book.title}`,
      book: book,
      count: cnt,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
};

 

// update — редактирование книги
module.exports.renderUpdate =  (req, res) => {
  const { id } = req.params;
    Book.findById(id).orFail()
    .then((book) => res.render('books/update', {
      title: `Книга | ${book.title}`,
      book: book,
    }))
    .catch((e) => {
      console.log(e);
      res.redirect('/404');
    }); 
};

// update — редактирование книги
module.exports.updateBook = (req, res) => {
  const { id } = req.params;
  const {
    title, description, authors, favorite,
    fileCover, fileName
  } = req.body;
  const isFavorite = favorite === 'on' || Boolean(favorite);
  if (req.file) {
    const { path } = req.file;
    fileBook = path;
  }
  Book.findByIdAndUpdate(id, {
    title, description, authors, favorite: isFavorite,
    fileCover, fileName, fileBook
  }).orFail()
    .then(() => res.redirect(`/books/${id}`))
    .catch((e) => {
        console.log(e);  
        res.redirect('/404');
    });
};

// удалить книгу по **ID**
module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id).orFail();
    res.redirect('/books');
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
};

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
 
const {Schema, model} = require('mongoose')

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    favorite: {
      type: String,
      required: true,
    },
    fileCover: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileBook: {
      type: String,
      required: true,
    },
  },
  { varsionKey: false },
);

module.exports = model('Book', bookSchema);

// const { v4: uuid } = require('uuid');

// class Book {
//   constructor(data = {}) {
//     const {
//       title, description, authors, favorite, fileCover, fileName, fileBook,
//     } = data;

//     this.id = uuid();
//     this.title = title ?? '';
//     this.description = description ?? '';
//     this.authors = authors ?? '';
//     this.favorite = favorite === 'on' ? true : Boolean(favorite);
//     this.fileCover = fileCover ?? '';
//     this.fileName = fileName ?? '';
//     this.fileBook = fileBook ?? '';
//   }
// }

// module.exports = Book;

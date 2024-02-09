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
      type: Boolean,
      required: true,
      default: false
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
 

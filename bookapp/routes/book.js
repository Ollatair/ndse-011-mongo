const router = require('express').Router();
const fileMulter = require('../middleware/file');

const {
  renderIndex,
  renderCreate,
  createBook,
  renderView,
  renderUpdate,
} = require('../controllers/books');

router.get('/', renderIndex);
router.get('/create', renderCreate);
router.post('/create', fileMulter.single('fileBook'), createBook);

router.get('/:id', renderView);
router.get('/update/:id', renderUpdate);
 

 

// // update — редактирование книги.
// router.post('/update/:id', fileMulter.single('fileBook'), (req, res) => {
//   const { books } = store;
//   const {
//     title, description, authors, favorite, fileCover, fileName,
//   } = req.body;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id === id);

//   if (idx !== -1) {
//     books[idx] = {
//       ...books[idx],
//       title,
//       description,
//       authors,
//       favorite,
//       fileCover,
//       fileName,
//     };

//     if (req.file) {
//       const { path } = req.file;
//       books[idx].fileBook = path;
//     }

//     res.redirect(`/books/${id}`);
//   } else {
//     res.redirect('/404');
//   }
// });

// // удалить книгу по **ID**
// router.post('/delete/:id', (req, res) => {
//   const { books } = store;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id === id);

//   if (idx !== -1) {
//     books.splice(idx, 1);
//     res.redirect('/books');
//   } else {
//     res.redirect('/404');
//   }
// });

module.exports = router;

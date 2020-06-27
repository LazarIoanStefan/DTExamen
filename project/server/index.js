var api = require('./src/api.js').app;
const fs = require('fs');
const booksFilepath = './src/books.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/books', function (request, response) {
  response.json(getBooks());
});

api.get('/books/:id', function (request, response) {
  let book = getBookById(request.params.id);
  if (book) response.json(book);
  response.json('not found');
});

api.put('/books', function (request, response) {
  response.json("Book was added succesfully");
  saveBook(request.body);
  
});

api.post('/books', function (request, response) {

  let books = [];
  try {
    books = JSON.parse(fs.readFileSync(booksFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var selbook=getBookById(request.body.id);
  if (selbook != null) {
    var oof=0;
    for (var i=0; i<books.length;i++) {
      if (books[i].id==request.body.id) oof=i;
    }
    books[oof]=request.body;
  };
  try {
    fs.writeFileSync(booksFilepath, JSON.stringify(books));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
  response.json('Book was saved succesfully');
});

api.delete('/books/:index', function (request, response) {
  let books = [];
  try {
    books = JSON.parse(fs.readFileSync(booksFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var oof=0;
  for (var i=0; i<books.length;i++) {
    if (books[i].id==request.params.index) oof=i;
  }
  books.splice(oof, 1);
  if (books==null) console.log();
  else{
  try {
    fs.writeFileSync(booksFilepath, JSON.stringify(books));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}
   response.json('Book with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getBooks() {
  let books = [];
  try {
    books = JSON.parse(fs.readFileSync(booksFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return books;
}

function saveBook(book) {
  let books = getBooks();// citire json din fisier
  let maxId = getMaxId(books); 
  book.id = maxId+1;// generare id unic
  books.push(book);// adaugare masina noua in array
  try {
    fs.writeFileSync(booksFilepath, JSON.stringify(books));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(books) {
  let max = 0;
  for (var i=0; i<books.length;i++) {
    if(max < books[i].id) {
      max = books[i].id;
    }
  }
  return max;
}

function getBookById(id){
  let books = getBooks();// citire json din fisier
  let selectedBook = null;
  for(var i=0; i<books.length; i++) {
    if(id == books[i].id) selectedBook = books[i];
  }
  return selectedBook;
}
function run() {
    new Vue({
      el: '#hey',
      data: {
        id: 'default',
        book: {},
        message: ''
      },
      created: function () {
      },
      methods: {
        addBook: function() {
              this.book={"id": 0,
            "title": document.getElementById("title").value,
            "author": document.getElementById("author").value,
            "price": document.getElementById("price").value,
            "publisher": document.getElementById("publisher").value,
            "edition": document.getElementById("edition").value,
            "year": document.getElementById("year").value};
            
            return axios.put('http://localhost:3000/books', this.book).then(
               (response) => {
                    this.message = response.data;
                    console.log(this.message); // saved
                }
            );      
            
          },
        }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  
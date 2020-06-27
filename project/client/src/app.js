function run() {
  new Vue({
    el: '#app',
    data: {
      books: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.books = response.data));
    },
    methods: {
      deleteBook: function(id) {
        console.log('HTTP DELETE spre backend, book: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.books = response.data));  
        });
      },
    }
  });


}

document.addEventListener('DOMContentLoaded', () => {
  run();
});

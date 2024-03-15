function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      let readString = this.read ? 'have' : "haven't" ;
      return `${this.title} was written by ${this.author}. I ${readString} read it.`;
    },

    readBook() {
      this.read = true;
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlement", 'PG Wodehouse', true);

console.log(book3.getDescription());

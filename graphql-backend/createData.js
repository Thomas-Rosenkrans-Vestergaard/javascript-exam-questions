const fs = require('fs');

module.exports = function () {

    const genres = [
        { id: 1, name: "Drama" },
        { id: 2, name: "Crime" },
        { id: 3, name: "Fantasy" },
        { id: 4, name: "Science Fiction" },
        { id: 5, name: "Western" },
        { id: 6, name: "Romance" },
        { id: 7, name: "Thriller" },
        { id: 8, name: "Mystery" },
        { id: 9, name: "Horror" },
        { id: 10, name: "Children" }
    ];
    const books = [];
    const authors = [];

    const contents = JSON.parse(fs.readFileSync('books.json'));

    contents.forEach((content, i) => {
        const author = { id: i, name: content.authors[0].name };
        authors.push(author);
        const book = {
            id: i, 
            title: content.title, 
            type: rnd(0, 2) == 0 ? "PAPER_BOOK" : "ELECTRONIC_BOOK", 
            authors: [author], 
            genre: [genres[rnd(0, genres.length)]]
        }

        books.push(book)
    })

    return { genres, books, authors };
}

function rnd(min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
}
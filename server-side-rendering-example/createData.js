const fs = require('fs');


const initialGenres = [
    {
        id: 1,
        name: "Drama"
    },
    {
        id: 2,
        name: "Crime"
    },
    {
        id: 3,
        name: "Fantasy"
    },
    {
        id: 4,
        name: "Science Fiction"
    },
    {
        id: 5,
        name: "Western"
    },
    {
        id: 6,
        name: "Romance"
    },
    {
        id: 7,
        name: "Thriller"
    },
    {
        id: 8,
        name: "Mystery"
    },
    {
        id: 9,
        name: "Horror"
    },
    {
        id: 10,
        name: "Children"
    }
];

module.exports = function () {


    const genres = initialGenres;
    const books = [];
    const fileContents = JSON.parse(fs.readFileSync('books.json'));

    fileContents.forEach((content, i) => {
        const book = {
            id: i,
            title: content.title,
            type: "PAPER_BOOK",
            year: content.year,
            language: content.language,
            authors: [{
                name: content.authors[0].name
            }],
            genres: [
                initialGenres[getRandomInt(0, initialGenres.length - 1)]
            ],
            pages: content.pages
        }

        books.push(book)
    })

    return {
        genres,
        books
    };
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
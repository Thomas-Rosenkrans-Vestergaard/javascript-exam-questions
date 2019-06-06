const {
    graphql,
    buildSchema
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const createData = require('./createData');

const schema = buildSchema(`

type Author {
    name: String!
}

input AuthorInput {
    name: String!
}

enum BookType {
    ELECTRONIC_BOOK
    PAPER_BOOK
}

type Genre {
    id: ID!
    name: String!
}

type Book {
    id: ID!
    title: String!
    type: BookType!
    genres: [Genre!]!
    authors: [Author!]!
}

input BookInput {
    title: String!
    type: BookType!
    genres: [ID!]!
    authors: [AuthorInput!]!
}

type Query {
    genres: [Genre]!
    
    books(n: Int = 20, start: Int=0): [Book]!
    searchBooks(term: String!): [Book]!    
    countBooks: Int!
}

type Mutation {
    deleteBook(id: ID!): Book
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
}
`);

const { genres, books } = createData();

const root = {

    /**
     * Returns all the books from offset start to start + n 
     */
    books(args) {
        const { n, start } = args;
        return books.slice(start, start + n);
    },
    /**
     * Returns the total number of books.
     */
    countBooks(args) {
        return books.length;
    },
    /**
     * Returns an array of the genres
     */
    genres() {
        return genres;
    },
    /**
     * Deletes the book with the provided id. 
     */
    deleteBook(args) {
        const { id } = args;
        for (let i = 0; i < books.length; i++) {
            const book = books[i]
            if (book.id == id) {
                books.splice(i, 1)
                return book;
            }
        }

        return null;
    },
    /**
     * Returns the books that contains the provided search term within the title
     */
    searchBooks(args) {
        return books.filter(book => book.title.toLowerCase().includes(args.term.toLowerCase()))
    },
    createBook(args) {
        args.input.id = getNextBookId()
        args.input.genres = args.input.genres.map(findGenre)
        books.push(args.input)
        return args.input;
    },
    updateBook(args) {
        const found = findBook(args.id);
        if (!found)
            return found;

        Object.keys(args.input).forEach(key => {
            if (found[key])
                found[key] = args.input[key];
        })

        found.genres = args.input.genres.map(findGenre)

        return found;
    }
};

function findBook(id) {
    for (let book of books)
        if (book.id == id)
            return book;

    return null;
}

function findGenre(id) {
    for (let genre of genres)
        if (genre.id == id)
            return genre;

    return null
}

function getNextBookId() {
    if (books.length < 1)
        return 1;
    else
        return books[books.length - 1].id + 1;
}

var app = express();
app.use(cors());
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000');
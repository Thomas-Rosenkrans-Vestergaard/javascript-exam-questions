const { graphql, buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = buildSchema(`

type Author {
    id: ID!
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
    genre: [Genre]!
    authors: [Author]!
}

input BookInput {
    title: String!
    type: BookType!
    genre: [Genre]!
    authors: [Author]!
}

type Query {
    books(n: Int = 20, start: Int=0): [Book]!
    authors(n: Int =20, start: Int=0): [Author]!
    genres: [Genre]! 
}

type Mutation {
    deleteBook(id: ID): Book
    createBook(input: BookInput): Book
    updateBook(id: ID, input: BookInput): Book
}
`);

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

const authors = [
    { id: 1, name: "Thomas Vestergaard" },
    { id: 2, name: "Alexander Dradrach" },
    { id: 3, name: "Steven Fuck" },
    { id: 4, name: "Filip Filipovic" }
];

const books = [
    { id: 1, title: "This is a great title", type: "PAPER_BOOK", authors: [authors[0], authors[1]], genre: [genres[0]] },
    { id: 2, title: "This is a boring title", type: "ELECTRONIC_BOOK", authors: [authors[0]], genre: [genres[0]] },
    { id: 3, title: "This is an exicting title", type: "PAPER_BOOK", authors: [authors[0], authors[2]], genre: [genres[2], genres[3], genres[4]] },
    { id: 4, title: "This is a fine title", type: "PAPER_BOOK", authors: [authors[0], authors[3]], genre: [genres[0]] },
    { id: 5, title: "This is another great title", type: "PAPER_BOOK", authors: [authors[0]], genre: [genres[0]] },
]

const root = {
    books: args => {
        const { n, start } = args;
        return books.slice(start, start + n);
    },
    authors: args => {
        const { n, start } = args;
        return authors.slice(start, start + n);
    },
    genres: () => {
        return genres;
    },
    deleteBook: (args) => {
        const { id } = args;
        for (let i = 0; i < books.length; i++) {
            if (book.id == id) {
                books.splice(i, 1)
                return book;
            }
        }

        return null;
    },
    updateBook: (args) => {
        const { id, input } = args;
    },
    createBook: (args) => {
        const { id, input } = args;

    }
};

var app = express();
app.use(cors());
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000');
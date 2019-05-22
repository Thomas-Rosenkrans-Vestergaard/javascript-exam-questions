const { graphql, buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const createData = require('./createData');

const schema = buildSchema(`

type Author {
    id: ID!
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
    genres: [Genre]!
    authors: [Author]!
}

input BookInput {
    title: String!
    type: BookType!
    genres: [ID!]!
    authors: [AuthorInput]!
}

type Query {
    books(n: Int = 20, start: Int=0): [Book]!
    countBooks: Int!
    authors(n: Int =20, start: Int=0): [Author]!
    genres: [Genre]!
    searchBooks(term: String!): [Book]!
}

type Mutation {
    deleteBook(id: ID): Book
    createBook(input: BookInput): Book
    updateBook(id: ID, input: BookInput): Book
}
`);

const {genres, authors, books} = createData();

const root = {
    books: args => {
        const { n, start } = args;
        return books.slice(start, start + n);
    },
    countBooks: args => {
        return books.length;
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
            const book = books[i]
            if (book.id == id) {
                books.splice(i, 1)
                return book;
            }
        }

        return null;
    },
    searchBooks: (args) => {
        return books.filter(book => book.title.toLowerCase().includes(args.term.toLowerCase()))
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
# Period-4 GraphQL

### Explain shortly about GraphQL, its purpose and some of its use cases

> GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

Using GraphQL, we define a schema consisting of our types that can be retrieved, and the queries that can be executed.

The main difference between REST and GraphQL is the number of endspoints exposed by a server. GraphQL only exposes one endpoint that can be used to execute all defined queries, whereas REST apis have a one-to-one relationship between endpoints and queries.

### Explain some of the Server Architectures that can be implemented with a GraphQL backend.

GraphQL can both be used to create apis over HTTP, like REST APIs. It can also be used as a data-store for a server-side rendering application. 

### What is meant by the terms over- and under-fetching in relation to REST.

>Over-fetching is fetching too much data, aka there is data in the reponse you don't use.
>
>Under-fetching is not having enough data with a call to an endpoint, leading you to call a second endpoint.
>
>In both cases, they are performances issues : you either use more bandwidth than you should, or you are making more HTTP requests that you should.
>
>In a perfect world, theses problems would never arise ; you would have exactly the right endpoints to give exactly the right data to your products.
>
>These problems often appear when you scale and iterate on your products. The data you use on your pages often change, and the cost to maintain a separate endpoint with exactly the right data for each component becomes too much.
>
>So you end up with a compromise between not having too much endpoints and having the endpoints fit the need best. This will lead to over-fetching in some cases (the endpoint will provide more data that you need for your specific component), and under-fetching in others (you will need to call a second endpoint).
>
>So GraphQL fixes this problem because it allows access to an arbitrary set of data exposed by the server. You specifically specify what you need and will get this data, and only this data, in one trip to the server.
- https://stackoverflow.com/questions/44564905/what-is-over-fetching-or-under-fetching

GraphQL fixes this by requiring the fields that must be retrieved from the server. The server therefor does not need to transfer unnecessary fields when making requests.

```
{
  books {
    title
    authors {
      id 
      name
    }
  }
}
```

Above we specify that the books should contain the `title` and `authors` field, but no other fields. The same technique is used to limit the fields on the `Author` entity. This information is sent when making the request.

### Explain shortly about GraphQL’s type system and some of the benefits we get from this.

- https://graphql.org/learn/schema/

The schema defines the data-types that can be retrieved from the datastore. The schema also contains the queries that can be performed by the client. The schema is created using the `GraphQL schema language`.

### Explain shortly about GraphQL Schema Definition Language, and provide a number of examples of schemas you have defined.

The `GraphQL schema language` is the language that is used to define types and queries on the backend server. The `GraphQL schema language` is independant from the server side programming language.

```graphql
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

type Query {
    books(n: Int=20, start: Int=0): [Book]!
    authors(n: Int=20, start: Int=0): [Author]!
    genres: [Genre]! 
}
```

In the above example we define the `Book`, `Author` and `Genre` types. These are like the entities we would return using REST APIs. Within the curly brackets we define the fields present on the type. These fields can be `ID`, scalar types or other complex types.

The available scalar types are ´String´, ´Int´, ´Float´, ´Boolean´, and ´ID´. These types are all nullable by default, unless you predend an exclamation point (`!`), `Int!` or `UserDefinedType!`.

Within the schema we also define the queries that clients can execute.

```
type Query {
    books(n: Int=20, start: Int=0): [Book]!
    authors(n: Int=20, start: Int=0): [Author]!
    genres: [Genre]! 
}
```

Here we define three queries `books`, `authors` and `genres`. We also declare the parameters the query take, along with their default values. The return type is also specified.

### Provide a number of examples demonstrating data fetching with GraphQL. You should provide examples both running in a Sandbox/playground and examples executed in an Apollo Client



### Provide a number of examples demonstrating creating, updating and deleting with Mutations. You should provide examples both running in a Sandbox/playground and examples executed in an Apollo Client.



### Explain the Concept of a Resolver function, and provide a number of simple example of resolvers you have implemented in a GraphQL Server.

Resolver functions are the functions that are invoked when a query is invoked. There is a one-to-one relationship between GraphQL queries and resolver functions.

The resolver function accepts the arguments provided by the GraphQL client.

```js
const root = {
    books: args => {
        const {n, start} = args;
        return books.slice(start, start + n);
    },
    authors: args => {
        const {n, start} = args;
        return authors.slice(start, start + n);
    },
    genres: () => {
        return genres;
    }
};
```

Here are the resolver functions for the above schema.

### Explain the benefits we get from using a library like Apollo-client, compared to using the plain fetch-API



### In an Apollo-based React Component, demonstrate how to perform GraphQL Queries

There are two primary ways of executing queries using apollo client. One is using the `Query` component that is rendered within the `render` method of the component. The other is calling the `query` method on the `client` directory. The latter method resembles a more _normal_ `fetch`-based approach.

```js

const GET_BOOKS = gql`{
    books {
      id
      title
      authors {
        id
        name
      }
    }
}`;

...

render() {
        return <>
            <h2>Books</h2>
            <Query query={GET_BOOKS}>
                {({ loading, error, data }) => {
                    if (error)
                        return <p>An error occured: {error}</p>
                    if (loading || !data)
                        return <p>Loading...</p>

                    return <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Authors</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.books.map(book =>
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>
                                        <ul>
                                            {book.authors.map(author =>
                                                <li key={author.id}>{author.name}</li>
                                            )}
                                        </ul>
                                    </td>
                                    <td><button>Update</button></td>
                                    <td><button onClick={() => this.delete(book.id)}>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }}
            </Query>
            </>
    }
```

[BookCrud_Legacy.js](./graphql-backend/src/BookCrud_Lagacy.js)

Above it can be seen that we provide the `Query` component with a function. This function is responsible for rendering the results of the query. This approach can cause problems, especially when the query is dependent on the state of the component.

Here is an example using `client.query` instead, from 
[BookCrud.js](./graphql-backend/src/BookCrud.js).

```js

import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Popup from "reactjs-popup";

const GET_BOOKS = gql`
query($pageSize: Int!, $offset: Int!) {
    books(n: $pageSize, start: $offset) {
        id
        title
        authors {
            id
            name
        }
    }
    countBooks
    genres {
        id
        name
    }
}`;

const SEARCH_BOOKS = gql`
query($term: String!) {
    searchBooks(term: $term) {
        id
        title
        authors {
            id
            name
        }
    }
}
`

const DELETE_BOOK = gql`
    mutation($id: ID!) {
        deleteBook(id: $id) {
            id
            title
        }
    }
`;

const CREATE_BOOK = gql`
    mutation($input: BookInput!) {
        createBook(input: $input) {
            id
            title
            authors {
                id
                name
              }
        }
    }
`;

export default class BookCrud extends Component {

    state = {
        genres: [],
        books: [],
        currentPage: 1,
        pageSize: 20,
        totalNumberOfResults: -1,
        searching: false,
        searchTerm: ""
    }

    async componentDidMount() {
        this.page(1);
    }

    delete = (id) => {
        const mutation = DELETE_BOOK;

        this.props.client.mutate({ mutation, variables: { id } }).then(response => {
            this.setState({ deleted: response.data.deleteBook });
        });
    }

    searchChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    updateSearch = async () => {

        if (this.state.searchTerm.length < 1) {
            this.setState({ searching: false })
            this.page(1)
        } else {
            const { data } = await this.props.client.query({ query: SEARCH_BOOKS, variables: { term: this.state.searchTerm } });
            this.setState({
                currentPage: 1,
                books: data.searchBooks,
                totalNumberOfResults: data.searchBooks.length,
                searching: true
            })
        }
    }

    render() {
        return (
            <div>
                <h2>Books</h2>
                <div className="filter">
                    <input type="search" name="search" onChange={this.searchChange} placeholder="search" />
                    <input type="submit" value="update" onClick={this.updateSearch} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.books.map(book =>
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>
                                    <ul>
                                        {book.authors.map(author =>
                                            <li key={author.id}>{author.name}</li>
                                        )}
                                    </ul>
                                </td>
                                <td><button>Update</button></td>
                                <td><button onClick={() => this.delete(book.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    {this.createPagination()}
                </div>
            </div>
        )
    }

    createPagination() {

        if (this.state.searching)
            return null;

        const links = [];

        for (let i = 1; i <= Math.max(Math.floor(this.state.totalNumberOfResults / this.state.pageSize), 1); i++) {
            links.push(<a href="#" onClick={() => this.page(i)}>{i}</a>)
        }

        return (<ul className="pagination">
            {links.map((link, i) => <li key={i}>{link}</li>)}
        </ul>)
    }

    async page(page) {
        const { client } = this.props
        const { data } = await client.query({
            query: GET_BOOKS,
            variables: {
                pageSize: this.state.pageSize,
                offset: (page - 1) * this.state.pageSize
            }
        });

        this.setState({
            genres: data.genres,
            currentPage: page,
            books: data.books,
            totalNumberOfResults: data.countBooks
        })
    }
}

```

If we used the `Query` component here, it would update, and retrieve the results any time the state was updated. This is not what we want, since our state also contains other information, that should be able to change, without the query refiring.

### Demonstrate and highlight important parts of a “complete” GraphQL-app using Express and MongoDB on the server side, and Apollo-Client on the client.


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

Above we specify that the books should contain the `title` and `authors` field, but no other fields. The same technique is used to limit the fields on the `Author` entity.

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



### Demonstrate and highlight important parts of a “complete” GraphQL-app using Express and MongoDB on the server side, and Apollo-Client on the client.


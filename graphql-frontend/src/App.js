import React from 'react';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo";
import BookCrud from "./BookCrud";
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div id="contaniner">
      <header>
        <h1>Apollo React</h1>
      </header>
      <main>
        <ApolloProvider client={client}>
              <BookCrud/>
        </ApolloProvider>
      </main>
    </div>
  );
}

export default App;

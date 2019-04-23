import React from 'react';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Apollo React</h1>
      </header>
      <main>
        <ApolloProvider client={client}>
              
        </ApolloProvider>
      </main>
    </div>
  );
}

export default App;

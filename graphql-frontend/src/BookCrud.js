import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Query } from "react-apollo";
import gql from 'graphql-tag';

const GET_BOOKS = gql`{
    books {
      id
      title
      authors {
        name
      }
    }
}`;

const MAKE_DELETE_BOOK = (id) => gql`mutation {
    deleteBook(id: ${id}) {
      id
      name
    }
  }
`

export default class BookCrud extends Component {

    delete = (bookId) => {
        const query = MAKE_DELETE_BOOK(bookId)
        
    }

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
                                <tr>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>
                                        <ul>
                                            {book.authors.map(author =>
                                                <li>{author.name}</li>
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
}
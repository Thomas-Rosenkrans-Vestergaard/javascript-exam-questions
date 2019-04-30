import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Popup from "reactjs-popup";

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

    delete = (id) => {
        const mutation = DELETE_BOOK;
        this.props.client.mutate({ mutation, variables: { id } }).then(response => {
            this.setState({ deleted: response.data.deleteBook });
        });
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
}
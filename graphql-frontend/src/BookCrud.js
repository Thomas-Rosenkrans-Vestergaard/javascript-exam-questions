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
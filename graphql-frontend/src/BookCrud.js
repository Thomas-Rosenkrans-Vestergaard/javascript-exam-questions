import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Popup from "reactjs-popup";
import Modal from "./modal/Modal";
import BookForm from "./BookForm";

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
        searchTerm: "",
        modal: null
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

    showCreateForm = () => {

        const onComplete = book => {

        }

        this.setState({ modal: <BookForm genres={this.state.genres || []} onComplete={onComplete} /> })
    }

    hideModal = () => {
        this.setState({ modal: null })
    }

    render() {
        return (
            <div>
                <h1>Books</h1>
                <Modal show={!!this.state.modal} onClose={this.hideModal}>
                    {this.state.modal}
                </Modal>
                <div className="filter" style={{ overflow: "auto" }}>
                    <input type="search" style={{ float: "left" }} name="search" onChange={this.searchChange} placeholder="Search title" />
                    <input type="submit" style={{ float: "left", marginLeft: '20px' }} value="Search" onClick={this.updateSearch} />
                    <button style={{ float: 'left', marginLeft: '20px' }} onClick={this.showCreateForm}>Create book</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="small">ID</th>
                            <th>Title</th>
                            <th>Authors</th>
                            <th className="small">Update</th>
                            <th className="small">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.books.map(book =>
                            <tr key={book.id}>
                                <td className="small">{book.id}</td>
                                <td>{book.title}</td>
                                <td>
                                    <ul>
                                        {book.authors.map(author =>
                                            <li key={author.id}>{author.name}</li>
                                        )}
                                    </ul>
                                </td>
                                <td className="small"><button>Update</button></td>
                                <td className="small"><button onClick={() => this.delete(book.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    {this.createPagination()}
                </div>
            </div >
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
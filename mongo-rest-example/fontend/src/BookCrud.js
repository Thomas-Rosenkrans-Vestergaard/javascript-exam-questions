import React, { Component } from "react";

const URL = 'http://localhost:3006/books';

export default class BookCrud extends Component {

    state = {
        books: []
    }

    async componentDidMount() {
        const response = await fetch(URL)
        const books = await response.json()
        this.setState({ books });
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Authors</th>
                        <th>Language</th>
                        <th>Pages</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map(book =>
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>
                                <ul>
                                    {book.authors.map((author, i) =>
                                        <li key={i}>{author.name}</li>
                                    )}
                                </ul>
                            </td>
                            <td>{book.language}</td>
                            <td>{book.pages}</td>
                            <td>
                                <a href="#" onClick={() => this.delete(book._id)}>delete</a>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        )
    }

    delete = async (bookId) => {
        const response = await fetch(`${URL}/${bookId}`, { method: 'DELETE' , headers: {'Accepts': 'application/json'}});
        if (response.ok) {
            const deleted = await response.json();
            this.setState(prev => ({books: prev.books.filter(book => book._id != deleted._id)}));
        }
    }
}
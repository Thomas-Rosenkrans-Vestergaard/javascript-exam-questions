import React, { Component } from "react";

export default class BookForm extends Component {

    constructor(props) {
        super(props);
        this.version = props.initialBook ? "Update" : "Create";
        this.state = {
            book: props.initialBook || {
                title: "",
                author: "",
                genre: null,
                type: null
            },
            errors: []
        }
    }

    onTextChange = (e) => {
        this.setState(prev => ({ ...prev.book, [e.target.name]: e.target.value }))
        console.log(this.state);
    }

    onGenreChange = (e) => {
        this.setState(prev => ({ ...prev.book, genre: e.target.value }))
        console.log(this.state);
    }

    onTypeChange = (e) => {
        this.setState(prev => ({ ...prev.book, type: e.target.value }))
        console.log(this.state);
    }

    onSubmit = (e) => {

        e.preventDefault()

        const errors = []
        const { title, author, genre, type } = this.state.book

        if (!title || title.length < 1)
            errors.push("title is required")
        if (!author || author.length < 1)
            errors.push("author is required")
        if (!genre || author.length < 1)
            errors.push("genre is required")
        if (!type || type.length < 1)
            errors.push("type is required")

        if (errors.length < 1)
            this.props.onComplete(this.state.book)
        else
            this.setState({ errors })
    }

    render() {
        return (<form>
            <ul>
                {this.state.errors.map(err => <li style={{listStyle: 'none'}}><p style={{ color: 'red' }}>{err}</p></li>)}
            </ul>
            <label>Title</label>
            <input name="title" value={this.state.book.title} onChange={this.onTextChange} />
            <label>Author</label>
            <input name="author" value={this.state.book.author} onChange={this.onTextChange} />
            <label>Genre</label>
            <select name="genre" onChange={this.onGenreChange}>
                {this.props.genres.map(genre =>
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                )}
            </select>
            <label>Type</label>
            <select name="type" onChange={this.onTypeChange}>
                <option value="PAPER_BOOK">Paper book</option>
                <option value="ELECTRONIC_BOOK">Electronic book</option>
            </select>
            <button onClick={this.onSubmit}>{this.version}</button>
        </form>)
    }
}
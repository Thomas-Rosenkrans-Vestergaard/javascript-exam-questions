import React, { Component } from "react";
import Select from 'react-select';

const initialBook = {
    title: "",
    authors: [{ name: "" }],
    genres: [],
    type: "PAPER_BOOK"
}

export default class BookForm extends Component {

    constructor(props) {
        super(props);

        this.version = props.initial ? "Update" : "Create";
        const book = props.initial ? { ...props.initial, genres: this.toSelectOptions(props.initial.genres) } : initialBook
        this.state = Object.assign({ errors: [] }, book)
        console.log(props.initial)
        console.log(this.state)
    }

    onTitleChange = (e) => {
        const { value } = e.target;
        this.setState({ title: value })
    }

    onAuthorChange(i, name) {
        const copy = [...this.state.authors]
        copy[i].name = name
        this.setState({ authors: copy })
    }

    onAuthorDelete(i) {
        const copy = [...this.state.authors]
        copy.splice(i)
        this.setState({ authors: copy })
    }

    onGenreChange = (e) => {
        this.setState({ genres: e })
    }

    onTypeChange = (e) => {
        const { value } = e.target;
        this.setState({ type: value })
    }

    addAuthor = (e) => {
        e.preventDefault();
        const copy = [...this.state.authors, { name: "" }]
        console.log(copy)
        this.setState({ authors: copy })
    }

    onSubmit = (e) => {

        e.preventDefault()

        const errors = []
        let { title, authors, genres, type } = this.state

        if (!title || title.length < 1)
            errors.push("title is required")
        authors = authors.filter(a => a.name.length > 0)
        if (!authors || authors.length < 1)
            errors.push("one author is required")
        if (!genres || genres.length < 1)
            errors.push("one genre is required")
        if (!type || type.length < 1)
            errors.push("type is required")

        if (errors.length < 1) {
            this.props.onComplete({
                title: this.state.title,
                authors: this.state.authors.map(a => ({ name: a.name })),
                genres: this.state.genres.map(g => g.value),
                type: this.state.type
            })
        } else
            this.setState({ errors })
    }

    render() {
        return (<form>
            <ul>
                {this.state.errors.map(err => <li style={{ listStyle: 'none' }}><p style={{ color: 'red' }}>{err}</p></li>)}
            </ul>
            <label>Title</label>
            <input name="title" value={this.state.title} onChange={this.onTitleChange} />
            <label>Author</label>
            <div>
                {this.state.authors.map((author, i) =>
                    <div key={i}>
                        <input name={"author-" + i} value={author.name} onChange={(e) => this.onAuthorChange(i, e.target.value)} />
                        <a style={{display: 'block', textAlign: 'left', marginBottom: '10px'}} onClick={() => this.onAuthorDelete(i)}>remove</a>
                    </div>
                )}
                <button onClick={this.addAuthor}>add author</button>
            </div>
            <label>Genre</label>
            <Select
                options={this.toSelectOptions(this.props.genres)}
                value={this.state.genres}
                isMulti={true}
                onChange={this.onGenreChange}
            />
            <label>Type</label>
            <select name="type" defaultValue={this.state.type} onChange={this.onTypeChange}>
                <option value="PAPER_BOOK">Paper book</option>
                <option value="ELECTRONIC_BOOK">Electronic book</option>
            </select>
            <button onClick={this.onSubmit}>{this.version}</button>
        </form>)
    }

    toSelectOptions = (genres) => {
        return genres.map(g => ({
            value: g.id,
            label: g.name
        }))
    }
}
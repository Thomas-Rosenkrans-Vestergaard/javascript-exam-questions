import React, { Component } from "react";
import fetch from "node-fetch";
import {JYLLAND, SJÆLLAND, BORNHOLM, FYN} from "./polygons"

const queries = {JYLLAND, SJÆLLAND, BORNHOLM, FYN}

export default class CityWithinPolygon extends Component {

    state = {
        query: SJÆLLAND,
        results: []
    }

    async componentDidMount() {
        this.updateTable()
    }

    updateTable = async () => {
        const response = await fetch("http://localhost:3010/api/cities/within", {
            method: 'POST',
            body: this.state.query,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.setState({ results: await response.json() })
    }

    onSelectQueryChange = e => {
        const name = e.target.value
        console.log(name)
        const query = queries[name]
        this.setState({query}, () => {
            this.updateTable()
        })
    }

    render() {

        return (
            <>
                <h2>Find cities within polygon</h2>
                <form>
                    <select onChange={this.onSelectQueryChange}>
                        {Object.entries(queries).map(([name, query]) =>
                            <option key={name} value={name}>{name}</option>
                        )}
                    </select>
                </form>
                <pre>{this.state.query}</pre>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map(c =>
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{c.country}</td>
                                <td>{c.position.coordinates[1]}</td>
                                <td>{c.position.coordinates[0]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}
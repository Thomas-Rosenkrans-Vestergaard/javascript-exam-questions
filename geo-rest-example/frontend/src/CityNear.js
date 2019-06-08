import React, { Component } from "react";
import fetch from "node-fetch";

export default class CityNear extends Component {

    state = {
        latitude: 55.844295,
        longitude: 12.422112,
        maxDistance: 10,
        results: []
    }

    createQueryString = () => {
        const copy = Object.assign({}, this.state)
        delete copy.results

        return Object.entries(copy).reduce((acc, p) => acc + `${p[0]}=${p[1]}&`, "?")
    }

    async componentDidMount() {
        this.updateTable()
    }

    updateTable = async () => {
        const response = await fetch("http://localhost:3010/api/cities/near" + this.createQueryString())
        this.setState({ results: await response.json() })
    }

    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    updateForm = e => {
        e.preventDefault();
        this.updateTable()
    }

    render() {

        return (
            <>
                <h2>Find cities near</h2>
                <form>
                    <div>
                        <label>Latitude</label>
                        <input name="latitude" value={this.state.latitude} onChange={this.onInputChange} />
                    </div>
                    <div>
                        <label>Longitude</label>
                        <input name="longitude" value={this.state.longitude} onChange={this.onInputChange} />
                    </div>
                    <div>
                        <label>Within radius (km)</label>
                        <input name="maxDistance" value={this.state.maxDistance} onChange={this.onInputChange} />
                    </div>
                    <button onClick={this.updateForm}>Update</button>
                </form>
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
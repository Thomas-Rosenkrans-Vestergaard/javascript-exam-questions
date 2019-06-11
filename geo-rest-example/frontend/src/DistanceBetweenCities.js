import React, { Component } from "react"
import fetch from "node-fetch";

export default class DistanceBetweenCities extends Component {

    state = {
        cities: [],
        a: null,
        b: null,
        distance: null
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:3010/api/cities")
        const cities = await response.json()
        this.setState({ cities })
    }

    render() {
        return (
            <div>
                <h2>Distance Calculator</h2>
                {this.createSelect('a')}
                {this.createSelect('b')}
                {this.state.distance && <p>Distance: {this.state.distance} km</p>}
            </div>
        )
    }

    calculateDistance = async () => {
        const {a, b} = this.state
        if (a && b) {
            const response = await fetch("http://localhost:3010/api/distance", {
                method: 'POST',
                body: JSON.stringify({a: a.position, b: b.position}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const distance = await response.json()
            this.setState({distance})
        }
    }

    onSelectChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: this.state.cities[Number(value)] }, this.calculateDistance)
    }

    createSelect = name => {
        return <select name={name} defaultValue="_" onChange={this.onSelectChange}>
            <option value="_">{name}</option>
            {this.state.cities.map((city, i) =>
                <option value={i}>{city.name}</option>
            )}
        </select>
    }
}
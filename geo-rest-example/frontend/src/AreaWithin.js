import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps"

class AreaWithin extends Component {

    state = {
        corners: [],
        result: null,
        polygon: null
    }

    onMapClick = e => {
        if (!this.state.polygon) {
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()

            this.setState({ corners: [...this.state.corners, { lat, lng }] })
        }
    }

    reset = () => {
        this.setState({ corners: [], result: null, polygon: null })
    }

    calculate = async () => {
        if (this.state.corners.length > 2) {
            const polygon = {
                "type": "Polygon",
                "coordinates": [[
                    ...this.state.corners.map(c => [c.lng, c.lat]),
                    [this.state.corners[0].lng, this.state.corners[0].lat]
                ]]
            }

            const areaSquareMeters = await this.makeRequest(polygon)
            const areaSquareKMeters = areaSquareMeters / 1000000
            const polygonR = <Polygon
                path={this.state.corners}
                key={1}
                options={{
                    fillColor: "#000",
                    fillOpacity: 0.4,
                    strokeColor: "#000",
                    strokeOpacity: 1,
                    strokeWeight: 1
                }}
                onClick={() => {
                    console.log("ahmet")
                }} />
            this.setState({ corners: [], result: areaSquareKMeters, polygon: polygonR })
        }
    }

    makeRequest = async (polygon) => {

        const response = await fetch("http://localhost:3010/api/area", {
            method: 'POST',
            body: JSON.stringify(polygon),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json()
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: '20px' }}>
                    <h2>Area calculator</h2>
                    <button style={{ marginRight: '20px' }} onClick={this.reset}>Reset</button>
                    <button style={{ marginRight: '20px' }} className={this.state.corners.length < 3 ? 'disabled' : ''} onClick={this.calculate}>Calculate</button>
                    {this.state.result && <p>Area (km<sup>2</sup>: {this.state.result}</p>}
                </div>
                <div position="absolute">
                    <GoogleMap
                        onClick={this.onMapClick}
                        defaultZoom={2}
                        defaultCenter={{ lat: 0, lng: 0 }}>
                        {this.state.corners.map((c, i) =>
                            <Marker key={i} position={c} />
                        )}
                        {this.state.polygon}
                    </GoogleMap>
                </div>
            </div>
        )
    }
}

export default withScriptjs(withGoogleMap(AreaWithin))
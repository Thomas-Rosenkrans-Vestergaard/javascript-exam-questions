import React, { Component } from "react";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";

class Geo extends Component {

    state = {
        nextMarkerId: 1,
        markers: []
    }

    render() {
        return (
            <div>
                <GoogleMap
                    defaultZoom={5}
                    defaultCenter={{ lat: 56, lng: 12 }}
                    onClick={this.onMapClick}
                >
                {this.state.markers.map(marker => 
                    <Marker position={marker} />
                )}
                </GoogleMap>
                <div id="interface">
                    <ul className="position-list">
                        {this.state.markers.map(marker =>
                            <li>
                                <span>{marker.lat}, {marker.lng}</span>
                                <a onClick={() => this.removeMarker(marker)}>remove</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }

    onMapClick = (information) => {
        const { lat, lng } = information.latLng
        this.setState(prev => ({
            nextMarkerId: prev.nextMarkerId + 1,
            markers: [...prev.markers, { id: prev.nextMarkerId, lat: lat(), lng: lng() }]
        }));
    }

    removeMarker = (marker) => {
        this.setState(prev => ({
            markers: prev.markers.filter(m => m.id != marker.id)
        }))
    }
}

export default withScriptjs(withGoogleMap(Geo));
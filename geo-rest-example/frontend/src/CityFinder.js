import React, {Component} from "react";
import fetch from "node-fetch";

export default class CityFinder extends Component {

    state = {
        results = []
    }

    componentDidMount(){
        fetch("http://localhost:3010/api/cities")
    }
}
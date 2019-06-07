const fetch = require('node-fetch')
const mongooseConnect = require('./mongooseConnect')
const CityModel = require('./CityModel')

async function populateFromGithub() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json")
        const cities = await response.json()
        console.log(`found ${cities.length} cities`)
        const danish = cities.filter(c => c.country == 'DK')
        console.log(`using ${danish.length} cities`)
        insert(danish)
    } catch (e) {
        console.error(e)
    }
}

function createGeoJsonPoint(lon, lat) {
    return {
        "type": "Point",
        "coordinates": [lon, lat]
    }
}

async function insert(cities) {

    console.log("starting mongo insertion")

    await CityModel.insertMany(cities.map(c => {
        
                    const lat = c.lat
                    const lng = c.lng
        
                    delete c.lat
                    delete c.lng
                    c.position = createGeoJsonPoint(lng, lat)
        
                    return c
                }))

    console.log("mongo insertion complete")
}

mongooseConnect()
populateFromGithub()
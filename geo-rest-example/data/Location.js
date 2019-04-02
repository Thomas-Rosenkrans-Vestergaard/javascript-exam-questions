const { Schema, model } = require('mongoose')

const PointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const LocationSchema = new Schema({
    comment: { type: String, unique: true, required: true },
    coordinates: { type: PointSchema, required: true }
}, { strict: true })

function point(coordinates) {
    return { type: "Point", coordinates: [coordinates.longitude, coordinates.latitude] }
}

module.exports = { LocationSchema, PointSchema, point }



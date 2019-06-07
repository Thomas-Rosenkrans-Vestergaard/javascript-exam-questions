const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const CitySchema = new Schema({
    name: {type: String, required: true},
    country: {type: String, required: true, index: true},
    position: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Schema.Types.Number]
        }
    }
});


CitySchema.index({ position: "2dsphere" });

module.exports = mongoose.model("City", CitySchema);
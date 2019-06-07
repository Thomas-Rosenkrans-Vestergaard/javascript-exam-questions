const turf = require('@turf/turf');
const CityModel = require('./CityModel')

module.exports = class Facade {

    static async findNearby(lng, lat, maxDistance) {
        return CityModel.find({
            position: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: maxDistance * 1000
                }
            }
        }).exec()
    }

    static async createCity(name, country, point) {
        return CityModel.create({name, country, position: point}).exec()
    }

    /**
     * Returns the distance between the provided positions.
     * @param {*} positions The GeoJson positions to measure the distances between</code>
     */
    static distance(positions) {
        if (positions.length < 2)
            return 0;

        let result = 0;
        for (let i = 1; i < positions.length; i++)
            result += turn.distance(positions[i - 1], positions[i]);

        return result;
    }

    /**
     * Returns the final position when moving <code>distance</code> along the provided <code>line</code>.
     * @param {*} line The line to move along.
     * @param {*} distance The distance to move along the line.
     */
    static along(line, distance) {
        return turf.along(line, distance);
    }

    /**
     * Returns the smallest square that can fit all the provided features.
     * @param {*} features The features to fit within the square.
     */
    static squareOf(features) {
        return turf.bbox(features);
    }

    /**
     * Returns the smallets reactangle that can fit all the provided features.
     * @param {*} features The features to fit within the rectangle.
     */
    static rectangleOf(features) {
        return turf.envelope(features);
    }

    /**
     * Returns the mean center of all the provided features.
     * @param {*} features The features to find the center of.
     */
    static centerOf(features) {
        return turf.center(features);
    }
}
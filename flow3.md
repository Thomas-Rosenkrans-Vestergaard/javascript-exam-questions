# Flow 3: Geo-data, GeoJSON, Geospatial Queries with MongoDB, React Native/Expo’s Location and MapView Components


## Explain and demonstrate basic Geo-JSON, involving as a minimum, Points and Polygons

- http://geojson.org/
- https://en.wikipedia.org/wiki/GeoJSON#Example
> GeoJSON is a format for encoding a variety of geographic data structures.

> GeoJSON supports the following geometry types:
>
>- Point
>- LineString
>- Polygon
>- MultiPoint
>- MultiLineString
>- MultiPolygon
>
> Geometric objects with additional properties are Feature objects

https://geojson.org/
https://tools.ietf.org/html/rfc7946

A Point is coordinates representing a single location 
```js
{
   "type": "Point",
   "coordinates": [100.0, 0.0]
}
```
A MultiPoint contains an array of points
```js
{
   "type": "MultiPoint",
   "coordinates": [
       [100.0, 0.0], [101.0, 1.0]
   ]
}
```
A LineString contains an array with a minimum of two points. The points will be connected with a line to the adjecent point values in the array of the LineString.
```js
{
    "type": "LineString",
    "coordinates": [
        [
            12.744140625,
            50.28933925329178
        ],
        [
            16.787109375,
            50.819818262156545
        ]
    ]
}
```
A MultiLineString is an array of LineString arrays
```js
{
   "type": "MultiLineString",
   "coordinates": [
       [ [100.0, 0.0], [101.0, 1.0] ],
       [ [102.0, 2.0], [103.0, 3.0] ]
   ]
}

```
A polygon consists of multiple lines with two connected ends that may have shapes inside of it. has some more complexity than the previous geometries, since it can have holes inside of it. The GeoJSON specification also became more strict as of 2016. It introduced "right hand rule", that is a rule for how your points are connected in a Polygon with holes inside of it
>A linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.
>


This is a normal polygon. Note that for all polygons, the first and last coordinate pair must match, this indicates to any GeoJson parsers, that the polygon has ended.
```js
{
    "type": "Polygon",
    "coordinates": [
        [
            [17, 53],
            [16, 52],
            [21, 53],
            [17, 53]
        ]
    ]
}
```
![](geojson-images/polygon1.png)
___
By providing a second coordinate array to the `coordinates` key, we can create a _hole_ in the polygon.
```js
{
    "type": "Polygon",
    "coordinates": [
        [
            [11.25,43.83452678223682],
            [29.179687499999996,40.97989806962013],
            [21.4453125, 53.12040528310657],
            [11.25,43.83452678223682]
        ],
        [
            [18.720703125, 46.800059446787316],
            [21.09375, 45.85941212790755],
            [20.9619140625, 48.07807894349862],
            [18.720703125, 46.800059446787316]
        ]
    ]
}
```
![](geojson-images/polygon2.png)
___
Geometry Collection is a collection of various geometries. This can contain all kinds of geometries. For example, this GeometryCollection contains the two examples above.
```js
{
    "type": "GeometryCollection",
    "geometries": [ 
        {
            "type": "Polygon",
            "coordinates": [[
                [17, 53],
                [16, 52],
                [21, 53],
                [17, 53]
            ]]
}, {
    "type": "Polygon",
    "coordinates": [
        [
            [11.25,43.83452678223682],
            [29.179687499999996,40.97989806962013],
            [21.4453125, 53.12040528310657],
            [11.25,43.83452678223682]
        ],
            [
                [18.720703125, 46.800059446787316],
                [21.09375, 45.85941212790755],
                [20.9619140625, 48.07807894349862],
                [18.720703125, 46.800059446787316]
            ]
        ]
    }
]}
```
![](geojson-images/geometry-collection.png)

---

A Feature is a wrapper object, containing a geometry and a object called properties. The value of the properties member is an object (any JSON object or a JSON null value). This can contain metadata for the geometry. In a real world example, this could be a persons location on tinder. If a feature has a commonly used identifier, that identifier should be included as a member of the feature object with the name "id".

```js
{
      "type": "Feature",
      "properties": {
        "name": "Mount Everest"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [86.922623, 27.986065]
      }
}
```
![](geojson-images/everest.png)
___
A `FeatureCollection` is a collection of features. A `FeatureCollection` has an array of features, and cannot contain raw geometries. 
```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-105.46875, 34.59704151614417],
                    [-86.484375, 34.59704151614417],
                    [-86.484375, 42.293564192170095],
                    [-105.46875, 42.293564192170095],
                    [-105.46875, 34.59704151614417]
                ]]
            },
            "properties": {
                "name": "Some square",
                "address": "United States"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-80.837753,35.249801]
            },
            "properties": {
                "name": "DOUBLE OAKS CENTER",
                "address": "1326 WOODWARD AV"
            }
        }
    ]
}
```

![](geojson-images/feature-collection.png) 

## Explain and demonstrate ways to create Geo-JSON test data

The website https://geojson.io can be used to generate Geo-JSON figures, by drawing them on a world map. The most common way to generate the GeoJSON is programmatically, if the location data needs to be sent to a server for further processing.

```js
function createGeoJsonPoint(lon, lat) {
    return {
        "type": "Point",
        "coordinates": [lon, lat]
    }
}

const point = createGeoJsonPoint(5,5, 6.6)
const json = JSON.stringify(point)
```

The json can then be sent to a server.

## Explain the typical order of longitude and latitude used by Server Side API’s and Client Side API’s

- https://macwright.org/lonlat/
- https://gis.stackexchange.com/questions/293897/is-srid-4326-lon-lat-or-lat-lon
- https://stackoverflow.com/questions/7309121/preferred-order-of-writing-latitude-longitude-tuples

There is no consensus on the order of latitude, longitude tuples. GeoJSON uses `[lon, lat]` while the Google Maps API uses `[lat, lon]`. Apple MapKit likewise use `[lon, lat]`.

>A frustrating inconsistency in geospatial (mapping) software is coordinate order. Coordinates are often represented as arrays, like [-87.73, 41.83], instead of objects, like { lng: -87.73, lat: 41.83 }. This leaves it up to the developer to determine whether -87.73 is the longitude or latitude. One choice places a point on Chicago, and the other a location deep in Antarctica.
>
>There's some consensus growing around longitude, latitude order for geospatial formats, but still chaos for libraries and software. It's up to the developer to be aware of this issue and read the requisite documentation, and flip coordinates if necessary to translate between different systems.

- https://wiki.osgeo.org/wiki/Axis_Order_Confusion
- https://docs.mongodb.com/manual/geospatial-queries/

Since geospacial data in MongoDB is just GeoJSON, MongoDB follows the same coordinate order as GeoJSON, [`lon`, `lat`]. The legacy coordinate pairs on mongoose MongoDB use(d) the same ordering.

## Explain and demonstrate a REST API that implements geo-features, using a relevant geo-library and plain JavaScript

[./geo-rest-example](./geo-rest-example)

## Explain and demonstrate a REST API that implements geo-features, using Mongodb’s geospatial queries and indexes.

[./geo-rest-example](./geo-rest-example)

## Explain and demonstrate a React Native Client that uses geo-components (Location, MapView, etc.)

https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini-app

## Demonstrate both server and client-side, of the geo-related parts of your implementation of the mini project

https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini
https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini-app
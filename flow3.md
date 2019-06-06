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

```json
{
    "type": "Point", 
    "coordinates": [30, 10]
}
```

```json
{
    "type": "LineString", 
    "coordinates": [
        [30, 10], [10, 30], [40, 40]
    ]
}
```

```json
{
    "type": "Polygon", 
    "coordinates": [
        [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
    ]
}
```

Above it can be seen that the polygon is constructed using an array of coordinates. The first and last coordinate are the same, signalling that the polygon is complete.

```json
{
    "type": "Polygon", 
    "coordinates": [
        [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]], 
        [[20, 30], [35, 35], [30, 20], [20, 30]]
    ]
}
```

A second array of coordinates can be included, to mark an exclusion within the polygon, as shown above. 

## Explain and demonstrate ways to create Geo-JSON test data

The website https://geojson.io can be used to generate Geo-JSON figures, by drawing them on a world map.

## Explain the typical order of longitude and latitude used by Server Side API’s and Client Side API’s

- https://macwright.org/lonlat/
- https://gis.stackexchange.com/questions/293897/is-srid-4326-lon-lat-or-lat-lon
- https://stackoverflow.com/questions/7309121/preferred-order-of-writing-latitude-longitude-tuples

There is no consensus on the order of latitude, longitude tuples. GeoJSON uses `[lat, lon]` while the Google Maps API uses `[lon, lat]`. Apple MapKit likewise use `[lon, lat]`.

>A frustrating inconsistency in geospatial (mapping) software is coordinate order. Coordinates are often represented as arrays, like [-87.73, 41.83], instead of objects, like { lng: -87.73, lat: 41.83 }. This leaves it up to the developer to determine whether -87.73 is the longitude or latitude. One choice places a point on Chicago, and the other a location deep in Antarctica.
>
>There's some consensus growing around longitude, latitude order for geospatial formats, but still chaos for libraries and software. It's up to the developer to be aware of this issue and read the requisite documentation, and flip coordinates if necessary to translate between different systems.

- https://wiki.osgeo.org/wiki/Axis_Order_Confusion
- https://docs.mongodb.com/manual/geospatial-queries/

Since geospacial data in MongoDB is just GeoJSON, MongoDB follows the same coordinate order as GeoJSON, [`lon`, `lat`].

## Explain and demonstrate a REST API that implements geo-features, using a relevant geo-library and plain JavaScript

I have instead created a React application using a relevant geo-library.

[./geo-rest-example](./geo-rest-example)

## Explain and demonstrate a REST API that implements geo-features, using Mongodb’s geospatial queries and indexes.

https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini

## Explain and demonstrate a React Native Client that uses geo-components (Location, MapView, etc.)

https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini-app

## Demonstrate both server and client-side, of the geo-related parts of your implementation of the mini project

https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini
https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini-app
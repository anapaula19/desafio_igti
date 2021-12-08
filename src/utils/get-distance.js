function degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
function getDistance(
    originLatitude,
    originLongitude,
    destinationLatitude,
    destinationLongitude
   ) {
    const EARTH_RADIUS = 6_371.071; // Earth
    const diffLatitudeRadians = degreesToRadians(
    destinationLatitude - originLatitude
    );
    const diffLongitudeRadians = degreesToRadians(
    destinationLongitude - originLongitude
    );
    const originLatitudeRadians = degreesToRadians(originLatitude);
    const destinationLatitudeRadians = degreesToRadians(destinationLatitude);
    const kmDistance =
    2 *
    EARTH_RADIUS *
    Math.asin(
    Math.sqrt(
    Math.sin(diffLatitudeRadians / 2) * Math.sin(diffLatitudeRadians / 2) 
   +
    Math.cos(originLatitudeRadians) *
    Math.cos(destinationLatitudeRadians) *
    Math.sin(diffLongitudeRadians / 2) *
    Math.sin(diffLongitudeRadians / 2)
    )
    );
    return kmDistance;
}
export {getDistance};
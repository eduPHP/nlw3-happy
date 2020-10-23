import {Dimensions} from "react-native";

interface Point {
    latitude: number
    longitude: number
}


/**
 * Calcula Latitude e longitude delta baseado na distancia entre os pontos no mapa
 *
 * https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-243423775
 * @param points
 */
export function regionForCoordinates(points: Point[]) {
    if (points.length === 1) {
        const { width, height } = Dimensions.get('window');
        const aspectRatio = width / height;
        const longitudeDelta = 0.05;
        const latitudeDelta = longitudeDelta * aspectRatio;
        return {
            ...points[0],
            latitudeDelta,
            longitudeDelta
        }
    }

    // points should be an array of { latitude: X, longitude: Y }
    let minX: number, maxX: number, minY: number, maxY: number;

    // init first point
    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX + (deltaX / 2),
        longitudeDelta: deltaY + (deltaY / 3)
    };
}

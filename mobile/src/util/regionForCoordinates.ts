import {Dimensions} from "react-native";
import * as Location from "expo-location";

interface Point {
    latitude: number
    longitude: number
}

export interface Region {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}


/**
 * Calcula Latitude e longitude delta baseado na distancia entre os pontos no mapa
 *
 * https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-243423775
 * @param points
 */
export async function regionForCoordinates(points: Point[]): Promise<Region> {
    if (points.length === 0) {
        const { width, height } = Dimensions.get('window');
        const aspectRatio = width / height;
        const longitudeDelta = 0.05;
        const latitudeDelta = longitudeDelta * aspectRatio;
        const {latitude, longitude} = await getLocation()
        return {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        }
    }
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

export async function getLocation(): Promise<Point> {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('Permissão negada');
        return await getLocation()
    }
    const {coords} = await Location.getCurrentPositionAsync({})

    return {latitude: coords.latitude, longitude: coords.longitude}
}

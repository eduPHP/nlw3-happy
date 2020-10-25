import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useEffect, useState} from "react";
import {useRoute} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    Linking,
    RefreshControl
} from "react-native";

import mapMarker from "../images/map-marker.png";
import {colors, fonts} from "../util/styles";
import {regionForCoordinates} from "../util/regionForCoordinates";
import api from "../services/api";
import Splash from "./Splash";
import Header from "../components/Header";
import {RectButton} from "react-native-gesture-handler";

interface OrphanageDetailsParams {
    id: number
}

interface Orphanage {
    id: number
    name: string
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    latitude: number
    longitude: number
    images: Array<{
        id: number
        url: string
    }>
}

export default function OrphanageDetails() {
    const route = useRoute()
    const {id} = route.params as OrphanageDetailsParams

    const [orphanage, setOrphanage] = useState<Orphanage>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const [mapConfig, setMapConfig] = useState(regionForCoordinates([{
        latitude: -28.830392,
        longitude: -52.498565
    }]))

    function loadData() {
        api.get(`orphanages/${id}`).then(response => {
            setOrphanage(response.data.orphanage)
            setMapConfig(regionForCoordinates([response.data.orphanage]))
            // navigation.setOptions({ title: 'Updated!' })
            setIsRefreshing(false);
        })
    }

    useEffect(() => {
        loadData();
    }, [id])

    async function handleGoogleMapsDirections(orphanage: Orphanage) {
        await Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`)
    }

    const onRefresh = React.useCallback(async () => {
        setIsRefreshing(true);
        loadData();
    }, [isRefreshing]);

    if (!orphanage) {
        return (<Splash text="Carregando..." />)
    }

    return (
        <View style={styles.container}>
            <Header
                showCancel={false}
                title="Detalhes do Orfanato"
            />
            <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                <ScrollView horizontal pagingEnabled style={styles.carousel}>
                    {orphanage.images.map((image, index) => (
                        <View key={index}>
                            <Image
                                style={styles.image}
                                source={{uri: image.url}}
                            />
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.content}>
                    <Text style={styles.title1}>{orphanage.name}</Text>
                    <Text style={styles.text}>
                        {orphanage.about}
                    </Text>
                    <View style={styles.mapContainer}>
                        <View style={styles.mapWrapper}>
                            <MapView
                                zoomEnabled={false}
                                pitchEnabled={false}
                                scrollEnabled={false}
                                rotateEnabled={false}
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                                initialRegion={mapConfig}>
                                <Marker icon={mapMarker} calloutAnchor={{x: 2.7, y: 0.8}} coordinate={{
                                    latitude: orphanage.latitude,
                                    longitude: orphanage.longitude
                                }}/>

                            </MapView>
                        </View>
                        <RectButton onPress={() => handleGoogleMapsDirections(orphanage)} style={styles.mapButtonContainer}>
                            <Text style={styles.mapButton} onPress={() => {
                            }}>Ver rotas no Google Maps</Text>
                        </RectButton>
                    </View>
                    <View style={styles.divider}/>
                    <Text style={styles.title2}>Instruções para visita</Text>
                    <Text style={styles.text}>{orphanage.instructions}</Text>
                    <View style={styles.buttonsContainer}>
                        <LinearGradient colors={[colors.blueLight, '#fff']} style={styles.buttonSquare}>
                            <Feather style={{marginBottom: 20}} name={'clock'} size={50} color={colors.blue}/>
                            <Text style={{...styles.buttonText, color: colors.blue}}>Segunda à Sexta</Text>
                            <Text style={{...styles.buttonText, color: colors.blue}}>{orphanage.opening_hours}</Text>
                        </LinearGradient>
                        {orphanage.open_on_weekends ? (
                            <LinearGradient colors={[colors.greenLight, '#fff']} style={styles.buttonSquare}>
                                <Feather style={{marginBottom: 20}} name={'alert-circle'} size={50} color={colors.green}/>
                                <Text style={{...styles.buttonText, color: colors.green}}>Atendemos fim de semana</Text>
                            </LinearGradient>
                        ) : (
                            <LinearGradient colors={[colors.redLight, '#fff']} style={styles.buttonSquare}>
                                <Feather style={{marginBottom: 20}} name={'alert-circle'} size={50} color={colors.red}/>
                                <Text style={{...styles.buttonText, color: colors.red}}>Não atendemos fim de semana</Text>
                            </LinearGradient>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        overflow: 'scroll',
        paddingHorizontal: 16,
    },
    carousel: {
        height: 260,
        width: Dimensions.get('screen').width,
    },
    image: {
        width: Dimensions.get('screen').width,
        height: 260,
    },
    divider: {
        height: 1,
        backgroundColor: colors.line,
        marginVertical: 10
    },
    title1: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 30,
        color: colors.textTitle,
        paddingVertical: 20
    },
    title2: {
        fontFamily: 'Nunito_800ExtraBold',
        paddingVertical: 20,
        fontSize: 24,
        color: colors.textTitle
    },
    text: {
        fontFamily: fonts.semibold,
        color: colors.textBase,
        fontSize: 16
    },

    mapContainer: {
        marginVertical: 36,
        borderRadius: 20,
        borderColor: colors.border,
        height: 196,
        borderWidth: 1,
        backgroundColor: '#fff',
        overflow: "hidden"
    },

    mapWrapper: {
        width: '100%',
        borderRadius: 20,
        height: 146,
        overflow: "hidden",
        elevation: 2
    },

    map: {
        width: '100%',
        height: 196,
        borderRadius: 20,
    },
    mapButtonContainer: {
        alignItems: "center",
        height: 49,
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#fff'
    },
    mapButton: {
        color: colors.textLink,
        fontFamily: 'Nunito_700Bold',

    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 36
    },
    buttonSquare: {
        borderRadius: 20,
        borderColor: colors.border,
        borderWidth: 1,
        backgroundColor: '#fff',
        width: '49%',
        aspectRatio: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: 15,
        fontFamily: fonts.semibold
    }
})

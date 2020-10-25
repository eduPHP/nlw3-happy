import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import React, {useState, useCallback} from "react";
import * as Location from 'expo-location';

import {Feather} from "@expo/vector-icons";
import {regionForCoordinates} from "../util/regionForCoordinates";
import mapMarker from "../images/map-marker.png";
import {colors, fonts} from "../util/styles";
import api from "../services/api";
import Splash from "./Splash";


interface Orphanage {
    id: number
    name: string
    about: string
    latitude: number
    longitude: number
    images: Array<{
        id: number
        url: string
    }>
}
const myLocation = {
    latitude: -28.830392,
    longitude: -52.498565
}

export default function OrphanagesMap() {
    const navigation = useNavigation()
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const [selectedOrphanage, setSelectedOrphanage] = useState<Orphanage | null>(null)
    const [loading, setLoading] = useState(true)
    const [mapConfig, setMapConfig] = useState(regionForCoordinates([myLocation]))

    async function getLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão negada');
            await getLocation()
            return
        }
        const {coords} = await Location.getCurrentPositionAsync({})

        setMapConfig(regionForCoordinates([{latitude: coords.latitude, longitude: coords.longitude}]))
    }

    async function getOrphanages() {
        setLoading(true);
        await getLocation();
        api.get('orphanages').then(response => {
            if (response.data.orphanages.length) {
                setOrphanages(response.data.orphanages)
            } else {
                setMapConfig(regionForCoordinates(response.data.orphanages))
            }
            setSelectedOrphanage(null)
            setLoading(false)
        })
    }

    useFocusEffect(
        useCallback(() => {
            getOrphanages()
        }, [])
    );

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', {id})
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    function handleMarkerTouch(orphanage: Orphanage) {
        setSelectedOrphanage(orphanage)
        setMapConfig(regionForCoordinates([orphanage]))

    }

    function handleUnselectOrphanage() {
        setSelectedOrphanage(null)
        setMapConfig(regionForCoordinates(orphanages))
    }

    if(loading) {
        return (<Splash text="Obtendo lista de orfanatos..." />)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={mapConfig}>
                {orphanages.map(orphanage => (
                    <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        calloutAnchor={{x: 0.5, y: 1.7}}
                        onPress={() => handleMarkerTouch(orphanage)}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude
                        }}
                    >
                    </Marker>
                ))}


            </MapView>
            {selectedOrphanage ? (
                <View style={styles.selectedFooter}>
                    <BorderlessButton
                        onPress={() => handleNavigateToOrphanageDetails(selectedOrphanage.id)}
                    >
                        <Image
                            style={styles.image}
                            source={{uri: selectedOrphanage.images[0].url}}
                        />
                    </BorderlessButton>
                    <BorderlessButton
                        onPress={() => handleNavigateToOrphanageDetails(selectedOrphanage.id)}
                        style={styles.selectedFooterData}
                    >
                        <Text style={styles.selectedFooterName}>{selectedOrphanage.name}</Text>
                        <Text style={{...styles.selectedFooterAbout, maxHeight: 100}}>
                            {selectedOrphanage.about}
                        </Text>
                    </BorderlessButton>
                    <View style={styles.selectedFooterButtonContainer}>
                        <RectButton style={styles.selectedOrphanageButton} onPress={handleUnselectOrphanage}>
                            <Feather name={'x'} size={20} color={colors.red}/>
                        </RectButton>
                        <RectButton
                            style={styles.selectedOrphanageButton}
                            onPress={() => handleNavigateToOrphanageDetails(selectedOrphanage.id)}
                        >
                            <Feather name={'arrow-right'} size={20} color={colors.blue}/>
                        </RectButton>
                    </View>
                </View>
            ) : (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>
                    <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                        <Feather name={'plus'} size={20} color={'#fff'}/>
                    </RectButton>
                </View>
            )}
            <RectButton style={styles.refreshButton} onPress={getOrphanages}>
                <Feather name={'refresh-cw'} size={20} color={colors.blue}/>
            </RectButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    refreshButton: {
        position: "absolute",
        top: 50,
        right: 24,
        width: 40,
        height: 40,
        backgroundColor: colors.onboardingButtonColor,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    calloutContainer: {
        width: 160,
        minHeight: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 16,
        justifyContent: 'center',
        elevation: 3
    },
    selectedFooterName: {
        fontFamily: fonts.bold,
        color: colors.textLink,
        fontSize: 16,
        marginBottom: 10
    },
    selectedFooter: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        height: 120,
        backgroundColor: '#fff',
        flexDirection: "row",
        borderRadius: 20,
        elevation: 3,
        justifyContent: "space-between",
    },
    selectedFooterData: {
        flex: 1,
        marginVertical: 16,
    },
    selectedFooterButtonContainer: {
        justifyContent: "space-between",
        paddingLeft: 16,
    },
    selectedFooterAbout: {
        fontFamily: fonts.semibold,
        color: colors.textComplements,
        flexShrink: 1
    },
    image: {
        height: 90,
        aspectRatio: 1,
        borderRadius: 10,
        marginRight: 10,
        marginVertical: 16,
        marginLeft: 16
    },
    selectedOrphanageButton: {
        width: 45,
        height: 45,
        borderRadius: 16,

        justifyContent: 'center',
        alignItems: 'center'
    },
    orphanatDetailsButton: {
        width: 45,
        height: 45,
        borderRadius: 16,

        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3
    },
    footerText: {
        fontFamily: fonts.extrabold,
        color: colors.textComplements
    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: colors.blue,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }

});

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import MapView, {MapEvent, Marker} from 'react-native-maps';

import {Region, regionForCoordinates} from "../../util/regionForCoordinates";

import mapMarkerImg from '../../images/map-marker.png';
import {fonts} from "../../util/styles";
import CursorSelect from "../../images/CursorSelect";
import Header from "../../components/Header";
import Splash from "../Splash";

export default function SelectMapPosition() {
    const navigation = useNavigation();
    const [position, setPosition] = useState({latitude: 0, longitude: 0})
    const [touched, setTouched] = useState<boolean>(false)
    const [mapConfig, setMapConfig] = useState<Region>()
    useEffect(() => {
        async function omg() {
            setMapConfig(await regionForCoordinates([]))
        }
        omg()
    }, [])

    function handleNextStep() {
        navigation.navigate('OrphanageData', { position });
    }

    async function handleSelectMapPosition(event: MapEvent) {
        setPosition(event.nativeEvent.coordinate)
        setMapConfig(await regionForCoordinates([event.nativeEvent.coordinate]))
    }

    if(!mapConfig || !mapConfig.latitude) {
        return (<Splash text="Detectando sua localização..." />)
    }

    return (
        <View style={styles.container}>
            {touched && (
                <Header
                    title="Selecione no mapa"
                />
            )}
            <MapView
                region={mapConfig}
                rotateEnabled={false}
                style={styles.mapStyle}
                onPress={handleSelectMapPosition}
            >
                {position.latitude !== 0 && (
                    <Marker
                        icon={mapMarkerImg}
                        coordinate={{
                            latitude: position.latitude,
                            longitude: position.longitude
                        }}
                    />
                )}
            </MapView>

            {position.latitude !== 0 && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </RectButton>
            )}
            {!touched && (
                <RectButton style={styles.overlay} onPress={() => setTouched(true)}>
                    <CursorSelect />
                    <Text style={styles.overlayText}>Toque no mapa para adicionar um orfanato</Text>
                </RectButton>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },

    overlay: {
        position: "absolute",
        backgroundColor: 'rgba(21,182,214,0.6)',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 80,
        elevation: 3
    },
    overlayText: {
        fontFamily: fonts.bold,
        color: '#fff',
        fontSize: 26,
        lineHeight: 40,
        textAlign: "center",
        marginTop: 20
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }
})

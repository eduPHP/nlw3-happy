import { View, StyleSheet, Dimensions, Text } from 'react-native'
import React from 'react'

import { colors } from '../util/styles'
import Logo from '../images/Logo'

interface SplashProps {
    text?: string
}

export default function Splash(props: SplashProps) {
    return (
        <View style={styles.container}>
            <View style={styles.image}>
               <Logo width={200} height={200} />
            </View>
            {props.text ? (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            ) : (
                <View style={styles.textContainer}>
                    <Text style={styles.textCity}>Soledade</Text>
                    <Text style={styles.text}>Rio Grande do Sul</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        width: Dimensions.get('window').width,
        maxWidth: Dimensions.get('window').width,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        marginTop: '50%'
    },
    textContainer: {
        marginBottom: 100,
        alignItems: 'center'
    },
    textCity: {
        color: '#fff',
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 20
    },
    text: {
        color: '#fff',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20
    }
})

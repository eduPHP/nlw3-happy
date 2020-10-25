import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {colors, fonts} from "../util/styles";
import HappyDone from "../images/HappyDone";
import {RectButton} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

export default function Done() {
    const navigation = useNavigation();

    function handleOkAction() {
        navigation.navigate('OrphanagesMap')
    }

    return (
        <View style={styles.container}>
            <HappyDone />
            <Text style={styles.title}>Ebaaa!</Text>
            <Text style={styles.text}>
                O cadastro deu certo e foi
                enviado ao administrador para ser
                aprovado. Agora é só esperar :)
            </Text>
            <RectButton onPress={handleOkAction} style={styles.button}>
                <Text style={styles.buttonText}>Ok</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.green,
        alignItems: "center",
        justifyContent: "center"
    },

    title: {
        color: '#fff',
        fontFamily: fonts.extrabold,
        fontSize: 45,
        marginTop: 30
    },
    text: {
        fontFamily: fonts.semibold,
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 50,
        textAlign: "center",
        lineHeight: 30,
        marginTop: 20
    },
    button: {
        backgroundColor: colors.greenDark,
        borderRadius: 16,
        padding: 10,
        width: 120,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.bold
    }
})

import React from "react"
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Feather} from "@expo/vector-icons";
import {colors, fonts} from "../util/styles";
import {useNavigation} from "@react-navigation/native";

export default function Cancel() {
    const navigation = useNavigation()
    function handleConfirm() {
        navigation.navigate('OrphanagesMap')
    }

    function handleCancel() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.xIcon}>
                <Feather name="x" color={colors.red} size={28} />
            </View>
            <Text style={styles.title}>Cancelar cadastro</Text>
            <Text style={styles.text}>
                Tem certeza que quer
                cancelar esse cadastro?
            </Text>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity onPress={handleCancel} style={styles.buttonInactive}>
                    <Text style={styles.buttonText}>Não</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleConfirm} style={styles.buttonActive}>
                    <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: "center",
        alignItems: "center"
    },

    xIcon: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: 64,
        height: 64,
        borderRadius: 16,
        marginBottom: 20
    },

    title: {
        fontFamily: fonts.extrabold,
        fontSize: 36,
        color: '#fff',
        marginBottom: 30
    },

    text: {
        color: '#fff',
        fontFamily: fonts.semibold,
        fontSize: 22,
        lineHeight: 32,
        textAlign: "center",
        paddingHorizontal: 60,
        marginBottom: 30
    },

    buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    buttonActive: {
        borderColor: colors.redDark,
        borderWidth: 2,
        backgroundColor: colors.redDark,
        borderRadius: 16,
        height: 56,
        width: 128,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4
    },

    buttonInactive: {
        borderWidth: 2,
        borderColor: colors.redDark,
        backgroundColor: colors.red,
        borderRadius: 16,
        height: 56,
        width: 128,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4
    },

    buttonText: {
        color: '#fff',
        fontFamily: fonts.bold,
        fontSize: 16
    }
})

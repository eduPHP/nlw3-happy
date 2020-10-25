import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {BorderlessButton} from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import {colors} from "../util/styles";

interface HeaderProps {
    title: string
    showCancel?: boolean
}

export default function Header({title, showCancel = true}: HeaderProps) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <BorderlessButton style={styles.button} onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color={colors.blue}/>
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
            {showCancel ? (
                <BorderlessButton style={styles.button} onPress={() => navigation.navigate('Cancel')}>
                    <Feather name="x" size={24} color={colors.closeHeader}/>
                </BorderlessButton>
            ) : (<View style={styles.button} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundHeader,
        borderBottomWidth: 1,
        borderColor: colors.borderHeader,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        paddingTop: 44,
        padding: 24,
        color: colors.textComplements,
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16
    },
    button: {
        padding: 20,
        marginTop: 24,
        // backgroundColor: '#333'
    }
})

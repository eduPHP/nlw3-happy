import {View, StyleSheet, Dimensions, Text, NativeSyntheticEvent, NativeScrollEvent} from 'react-native'
import React, {useState} from 'react'
import {colors, fonts} from '../util/styles'
import HappyEarth from '../images/HappyEarth'
import {RectButton, ScrollView} from "react-native-gesture-handler";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import HappyKids from "../images/HappyKids";

const screenWidth = Dimensions.get('screen').width

export default function Onboarding() {
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(0)
    const [ref, setRef] = useState<ScrollView | null>(null)

    const handleSwipe = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const page = Math.round(nativeEvent.contentOffset.x / screenWidth)
        if (currentPage === 1 && nativeEvent.contentOffset.x > screenWidth - 10) {
            return navigation.navigate('OrphanagesMap')
        }

        setCurrentPage(page)
    }

    const handlePageChange = (page: number) => {
        if (page > 1) {
            return navigation.navigate('OrphanagesMap')
        }
        setCurrentPage(page)
        ref?.scrollTo({
            x: page === 0 ? 0 : screenWidth,
            y: 0,
            animated: true
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={ref => setRef(ref)}
                onMomentumScrollEnd={handleSwipe}
            >
                <View key={0} style={styles.page}>
                    <HappyEarth style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Leve felicidade para o mundo
                        </Text>
                        <Text style={styles.text}>
                            Visite orfanatos e mude o dia de muitas crianças.
                        </Text>
                    </View>
                </View>
                <View key={1} style={styles.page}>
                    <HappyKids style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.titleSmall}>
                            Escolha um orfanato no mapa e faça uma visita
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.pageContainer}>
                    <View style={styles[currentPage === 0 ? 'pageActive' : 'pageInactive']} />
                    <View style={styles[currentPage === 1 ? 'pageActive' : 'pageInactive']} />
                </View>
                <RectButton style={styles.button} onPress={() => handlePageChange(currentPage + 1)}>
                    <Feather name="arrow-right" color={colors.blue} size={20}/>
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundOnboarding,
        width: Dimensions.get('window').width,
        maxWidth: Dimensions.get('window').width,
        alignItems: 'center',
    },
    page: {
        flex: 1,
        backgroundColor: colors.backgroundOnboarding,
        width: Dimensions.get('window').width,
        maxWidth: Dimensions.get('window').width,
        alignItems: 'center',
        paddingHorizontal: 50
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Dimensions.get('screen').width,
        paddingHorizontal: 50,
        marginBottom: 40
    },
    pageContainer: {
        flexDirection: "row"
    },
    pageActive: {
        height: 5,
        width: 25,
        backgroundColor: colors.onboardingActivePage,
        borderRadius: 3,
        marginRight: 5
    },
    pageInactive: {
        height: 5,
        width: 8,
        backgroundColor: colors.onboardingInactivePage,
        borderRadius: 3,
        marginRight: 5
    },
    image: {
        marginTop: 50
    },
    textContainer: {
        alignItems: 'center'
    },
    title: {
        fontSize: 55,
        fontFamily: fonts.extrabold,
        color: colors.textLink,
        lineHeight: 60,
        marginVertical: 15
    },
    titleSmall: {
        fontSize: 35,
        fontFamily: fonts.extrabold,
        color: colors.textLink,
        lineHeight: 40,
        marginVertical: 30,
        textAlign: "right"
    },
    text: {
        fontSize: 20,
        fontFamily: fonts.semibold,
        color: colors.textLink,
        paddingRight: 20
    },

    button: {
        backgroundColor: colors.onboardingButtonColor,
        width: 56,
        height: 56,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})

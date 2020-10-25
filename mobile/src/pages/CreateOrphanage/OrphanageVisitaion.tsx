import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Switch, Text, TextInput, ActivityIndicator} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from "../../services/api";
import {styles} from "./formStyles";
import Cancel from "../../components/Cancel";

interface OrphanageDataParams {
    orphanage: {
        latitude: number,
        longitude: number,
        name: string,
        about: string,
        images: string[]
    }
}

export default function OrphanageVisitation() {
    const navigation = useNavigation();
    const route = useRoute()
    const params = route.params as OrphanageDataParams
    const [instructions, setInstructions] = useState('')
    const [opening_hours, setOpeningHours] = useState('')
    const [open_on_weekends, setOpenOnWeekends] = useState(true)
    const [working, setWorking] = useState(false)

    async function handleCreateOrphanage() {
        if (working) return
        setWorking(true)
        const data = new FormData()
        data.append('latitude', String(params.orphanage.latitude))
        data.append('longitude', String(params.orphanage.longitude))
        data.append('name', params.orphanage.name)
        data.append('about', params.orphanage.about)
        data.append('instructions', instructions.trim())
        data.append('opening_hours', opening_hours.trim())
        data.append('open_on_weekends', String(open_on_weekends))
        params.orphanage.images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: image
            } as any)
        })

        await api.post('orphanages', data).then(() => {
            setWorking(false)
            navigation.navigate('Done')
        }).catch(err => {
            setWorking(false)
            console.log(err.response.data.errors)
        })

    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{padding: 24}}>
            <Text style={styles.title}>Visitação</Text>

            <Text style={styles.label}>Instruções</Text>
            <TextInput
                style={[styles.input, {height: 110}]}
                multiline
                value={instructions}
                onChangeText={setInstructions}
            />

            <Text style={styles.label}>Horario de visitas</Text>
            <TextInput
                style={styles.input}
                value={opening_hours}
                onChangeText={setOpeningHours}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch
                    thumbColor="#fff"
                    trackColor={{false: '#ccc', true: '#39cc83'}}
                    value={open_on_weekends}
                    onValueChange={setOpenOnWeekends}
                />
            </View>

            <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
                {working ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.nextButtonText}>Cadastrar</Text>
                )}
            </RectButton>
        </ScrollView>
    )
}

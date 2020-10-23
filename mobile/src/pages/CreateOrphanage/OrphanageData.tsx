import React, {useState} from 'react';
import {ScrollView, View, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import {styles} from "./formStyles";

interface OrphanageLocationParams {
    position: {
        latitude: number
        longitude: number
    }
}

export default function OrphanageData() {
    const navigation = useNavigation();
    const route = useRoute()
    const params = route.params as OrphanageLocationParams
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [images, setImages] = useState<string[]>([])

    async function handleCreateOrphanage() {
        const {latitude, longitude} = params.position
        const orphanage = {
            latitude,
            longitude,
            name,
            about,
            images
        }

        navigation.navigate('OrphanageVisitaion', {orphanage})
    }

    async function handleSelectImages() {
        const {status} = await ImagePicker.requestCameraPermissionsAsync()

        if (status !== 'granted') {
            alert('Precisamos de acesso às suas fotos...')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })

        if (result.cancelled) {
            return
        }

        const {uri: image} = result

        setImages([...images, image])
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{padding: 24}}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Sobre</Text>
            <TextInput
                style={[styles.input, {height: 110}]}
                multiline
                value={about}
                onChangeText={setAbout}
            />

            {/*<Text style={styles.label}>Whatsapp</Text>*/}
            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    */}
            {/*/>*/}

            <Text style={styles.label}>Fotos</Text>
            <View style={styles.uploadedImagesContainer}>
                {images.map(image => (
                    <Image source={{uri: image}} key={image} style={styles.uploadedImage} />
                ))}
            </View>
            <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15B6D6"/>
            </TouchableOpacity>

            <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
                <Text style={styles.nextButtonText}>Continuar</Text>
            </RectButton>
        </ScrollView>
    )
}

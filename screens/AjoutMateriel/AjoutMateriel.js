import { Text, TouchableOpacity, View } from "react-native"
import { Icon, Image, Input } from "react-native-elements"
import { useEffect, useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker';
import AppStyles from "../../AppStyles";
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { Button } from "../../components/Button";
export const AjoutMateriel = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(null);
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const [startedDate, setStartedDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(new Date(currentDate.getTime() + oneDay));
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [description, setDescription] = useState("Description du matériel");

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })()
    }, [])

    const onChangeStartedDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowStartDate(false);
        if (currentDate > endDate) {
            setEndDate(new Date(currentDate.getTime() + oneDay));
        }

        setStartedDate(currentDate);
    };
    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowEndDate(false);
        if (currentDate < startedDate) {
            setStartedDate(new Date(currentDate.getTime() - oneDay));
        }
        setEndDate(currentDate);
    };

    const showStartDatePicker = () => {
        setShowStartDate(true);
    };

    const showEndDatePicker = () => {
        setShowEndDate(true);
    }

    const onAddPhoto = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.granted === false) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const { assets } = result;
            if (assets && assets.length > 0) {
                setImage(assets[0].uri);

            }
        }
    };

    const onAddMaterial = () => {
        const material = {
            description: description,
            start_date: startedDate.toISOString().slice(0, 19).replace('T', ' '),
            end_date: endDate.toISOString().slice(0, 19).replace('T', ' '),
            image: image,
            isReserveed: false,
        }
        fetch("http://172.20.10.12:3000/material", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ material })
        })
            .then((response) => response.json())
            .then((json) => {
                setSuccess('Le matériel a bien été ajouté');

                setTimeout(() => {
                    setSuccess(null);
                }
                    , 3000);

            })
    }
    const styles = AppStyles();

    return (
        <View style={styles.container}>
            {success && (
                <Text style={{ color: "green" }}>{success}</Text>
            )}
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Ajout d'un matériel</Text>
            <Input label="Description" value={description} onChangeText={(value) => setDescription(value)} />
            <TouchableOpacity
                onPress={showStartDatePicker}
                style={{
                    backgroundColor: '#DDDDDD',
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    width: 300
                }}>
                <Text>Date de début : {startedDate.toLocaleDateString('fr-FR')} </Text>
            </TouchableOpacity>
            {showStartDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startedDate}
                    mode='date'
                    is24Hour={true}
                    onChange={onChangeStartedDate}
                />
            )}
            <TouchableOpacity
                onPress={showEndDatePicker}
                style={{
                    backgroundColor: '#DDDDDD',
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    width: 300
                }}>
                <Text>Date de fin : {endDate.toLocaleDateString('fr-FR')} </Text>
            </TouchableOpacity>
            {showEndDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode='date'
                    is24Hour={true}
                    onChange={onChangeEndDate}
                />
            )}
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}

            <TouchableOpacity
                style={{
                    backgroundColor: '#BEADFA',
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    width: "auto",
                    display: "flex",
                    flexDirection: "row",
                }}
                onPress={() => onAddPhoto()}
            >
                <Text style={{ color: "white" }}>Ajouter une image</Text>
                <Icon name="camera" type="font-awesome" iconStyle={{
                    color: "white",
                    marginLeft: 10,
                    fontSize: 15
                }} />
            </TouchableOpacity>
            <Button text="Ajouter" onPress={onAddMaterial} />
        </View>
    )
}
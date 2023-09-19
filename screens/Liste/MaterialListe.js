import { FlatList, Text, View } from "react-native";
import useAppStyle from "../../AppStyles";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";

export const MaterialListe = ({ navigation }) => {
    const stylesTask = {
        padding: 15,
        margin: 5,
        backgroundColor: "#eee",
        borderRadius: 5,
        minHeight: 50,
        width: "100%",
        alignSelf: "center",
    };

    const styles = useAppStyle();

    const [materialList, setMaterialList] = useState([]);

    useEffect(() => {
        fetch("http://172.20.10.12:3000/materials")
            .then((result) => result.json())
            .then((liste) => {
                setMaterialList(liste);
                console.log("received");
            });
    }, []);

    const getDateString = (date) => {
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const reserveMaterial = (id) => {
        fetch(`http://172.20.10.12:3000/material/reserved/${id}`, {
            method: "PATCH",
        })
            .then((result) => result.json())
            .then((liste) => {
                console.log(liste)
                setMaterialList([...materialList.filter((item) => item.id !== id), liste[0]]);
            });

    }
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginBottom: 20 }]}>
                Nombre de tache à effectuer : {materialList.length}
            </Text>
            <FlatList
                style={{ width: "100%", padding: 15 }}
                data={materialList}
                renderItem={({ item }) => (
                    <View
                        style={[
                            stylesTask,
                            item.complete ? { backgroundColor: "#beebc0" } : {},
                        ]}
                    >
                        <Text>{item.description}</Text>
                        <Text>{getDateString(item.start_date)} To {getDateString(item.end_date)}</Text>
                        <Button text={item.isReserveed ? 'Rupture' : 'Réserver'} isDisabled={item.isReserveed} onPress={() => { reserveMaterial(item.id) }}></Button>

                    </View>

                )}
            ></FlatList>
            <Button
                fab
                icon="plus"
                onPress={() => navigation.navigate("Add material")}
            ></Button>
        </View>
    );
};

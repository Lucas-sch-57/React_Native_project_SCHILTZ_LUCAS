import { FlatList, Text, View } from "react-native";
import useAppStyle from "../../AppStyles";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";

export const Liste = ({ navigation }) => {
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

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log("send");
    fetch("http://172.20.10.12:3000/tasks")
      .then((result) => result.json())
      .then((liste) => {
        setTodoList(liste);
        console.log("received");
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginBottom: 20 }]}>
        Nombre de tache à effectuer : {todoList.length}
      </Text>
      <FlatList
        style={{ width: "100%", padding: 15 }}
        data={todoList}
        renderItem={({ item }) => (
          <View
            style={[
              stylesTask,
              item.complete ? { backgroundColor: "#beebc0" } : {},
            ]}
          >
            <Text>{item.title}</Text>
          </View>
        )}
      ></FlatList>
      <Button
        fab
        icon="plus"
        onPress={() => navigation.navigate("Add task")}
      ></Button>
    </View>
  );
};

import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { Icon } from "react-native-elements";

export const Button = ({
  text,
  onPress,
  fab,
  icon,
  iconType = "font-awesome",
  isDisabled
}) => {
  const styles = {
    content: {
      backgroundColor: isDisabled ? colors.grey : colors.primary,
      height: 60,
      borderRadius: 15,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontWeight: "bold",
      color: !isDisabled ? colors.white : colors.black,
      fontSize: 20,
    },
    fabContainer: {
      position: "absolute",
      bottom: 16,
      right: 16,
    },
    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
    },
  };

  //Note : sur certain appareil Android il est nécessaire d'ajouter un
  // composant View pour que la position absolue fonctionne

  return (
    <View style={fab ? styles.fabContainer : {}}>
      <TouchableOpacity
        onPress={onPress}
        style={fab ? styles.fab : styles.content}
        disabled={isDisabled}
      >
        {icon ? (
          <Icon color={styles.text.color} name={icon} type={iconType} />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

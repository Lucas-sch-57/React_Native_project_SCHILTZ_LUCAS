import { useColorScheme } from "react-native";

export const colors = {
  primary: "#467386",
  accent: "#D5A26A",
  warn: "#A7373F",
  white: "#fff",
  black: "#000",
  grey: "#f2f2f2",
};

export default () => {

    const themeName = useColorScheme();

    const styles = {
      light: {
        background: colors.white,
        text: colors.black,
      },
      dark: {
        background: colors.black,
        text: colors.white,
      },
    };

    return styles[themeName];
}
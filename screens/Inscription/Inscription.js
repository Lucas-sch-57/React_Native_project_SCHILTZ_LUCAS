import { Text, View } from "react-native";
import useAppStyle from "../../AppStyles";
import { PasswordInput } from "../../components/PasswordInput";
import { EmailInput } from "../../components/EmailInput";
import { Button } from "../../components/Button";
import { useState } from "react";

export const Inscription = () => {
  const styles = useAppStyle();
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (inputName, inputValue) => {
    setInputValues({
      ...inputValues,
      [inputName]: inputValue
    });
  }

  return (
    <View style={styles.container}>
      {console.log(emailError, passwordError)}
      <Text style={[styles.text, { fontSize: 28 }]}>Page d'inscription</Text>
      <EmailInput label="Email" onChange={(value) => handleInputChange("email", value)} setEmailError={setEmailError} />
      <PasswordInput label="Mot de passe" onChange={(value) => handleInputChange("password", value)} setPasswordError={setPasswordError} />
      <Button text="S'inscrire" isDisabled={(emailError || passwordError) ? true : false} />
    </View>
  );
};

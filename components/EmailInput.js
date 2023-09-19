import { useState } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";

export const EmailInput = (props) => {
    const { label, value, onChange, setEmailError } = props;
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");
    const [emailValidError, setEmailValidError] = useState(false);
    const [timeoutEmail, setTimeoutEmail] = useState(null);
    const [emailExistError, setEmailExistError] = useState(false);

    const onChangeLogic = (text) => {
        setEmailValidError(!emailRegex.test(text));
        if (timeoutEmail) clearTimeout(timeoutEmail);
        const timeout = setTimeout(() => {
            fetch(`http://172.20.10.12:3000/user/${text}`)
                .then((response) => response.status === 200 ? true : false)
                .then((emailExist) => {
                    if (emailExist) {
                        setEmailExistError(true);
                    }
                })
        }, 3000);
        setTimeoutEmail(timeout);

        if (!emailValidError && !emailExistError) {
            setEmailError(false);
        }
    }
    return (
        <View style={{ width: '100%', marginTop: 20 }}>
            <Input
                label={label}
                value={value}
                onChangeText={(value) => {
                    onChange(value)
                    onChangeLogic(value)
                }}
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                placeholder="example@example.fr"
            />
            {emailValidError && <Text style={{ color: 'red' }}>L'email n'est pas valide, il doit être au format email@example.fr</Text>}
            {emailExistError && <Text style={{ color: 'red' }}>L'email existe déjà</Text>}
        </View>
    );
}
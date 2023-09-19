import { Text, TextInput, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import AppStyles from "../AppStyles";
import { useState } from "react";

export const PasswordInput = (props) => {
    const { label, value, onChange, setPasswordError } = props;

    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
    const [isUpperCaseValid, setIsUpperCaseValid] = useState(false);
    const [isNumberValid, setIsNumberValid] = useState(false);

    const lengthRegex = new RegExp("^(?=.{8,})");
    const specialCharRegex = new RegExp("^(?=.*[!@#$%^&*])");
    const upperCaseRegex = new RegExp("^(?=.*[A-Z])");
    const numberRegex = new RegExp("^(?=.*[0-9])");

    const styles = AppStyles();

    const checkRegex = (regex, text) => {
        return regex.test(text);
    }

    const onChangeLogic = (text) => {
        setIsLengthValid(checkRegex(lengthRegex, text));
        setIsSpecialCharValid(checkRegex(specialCharRegex, text));
        setIsUpperCaseValid(checkRegex(upperCaseRegex, text));
        setIsNumberValid(checkRegex(numberRegex, text));

        if (!isLengthValid && !isUpperCaseValid && !isSpecialCharValid) {
            setPasswordError(false);
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
                secureTextEntry={true}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                placeholder="********"
            />
            <View style={[{ marginVertical: 20 }]}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: isLengthValid ? 'green' : 'red' }}>
                        Le mot de passe doit contenir au moins 8 caractères
                    </Text>
                    <Icon name={isLengthValid ? "check" : "times"} type="font-awesome" iconStyle={{ fontSize: 12, marginLeft: 10, color: isLengthValid ? 'green' : 'red' }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: isUpperCaseValid ? 'green' : 'red' }}>
                        Le mot de passe doit contenir au moins 1 majuscule
                    </Text>
                    <Icon name={isUpperCaseValid ? "check" : "times"} type="font-awesome" iconStyle={{ fontSize: 12, marginLeft: 10, color: isUpperCaseValid ? 'green' : 'red' }} />
                </View>
                <View style={{ display: 'flex', flexDirection: "row" }} >
                    <Text style={{ color: isSpecialCharValid ? 'green' : 'red' }}>
                        Le mot de passe doit contenir au moins 1 caractère spécial
                    </Text>
                    <Icon name={isSpecialCharValid ? "check" : "times"} type="font-awesome" iconStyle={{ fontSize: 12, marginLeft: 10, color: isSpecialCharValid ? 'green' : 'red' }} />
                </View>
            </View>
        </View>
    );

}
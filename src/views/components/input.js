import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import COLORS from "../../conts/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'

const Input = ({ label, iconName, error, password, email, onFocus = () => { }, ...props }) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    const [hideEmail, setHideEmail] = React.useState(email);
    return (
        <View>
            <Text style={style.label}>{label}</Text>
            <View
                style={[style.inputContainer,
                {
                    borderColor: error
                        ? COLORS.red
                        : isFocused
                            ? COLORS.darkBlue
                            : COLORS.light
                }]}>

                <Ionicons name={iconName} style={{ fontSize: 18, color: COLORS.darkBlue, marginRight: 10 }} />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{
                        color: COLORS.darkBlue,
                        flex: 1,
                    }}
                    {...props} />
                {password && (<Ionicons onPress={() => setHidePassword(!hidePassword)}
                    style={{ fontSize: 22, color: COLORS.darkBlue }}
                    name={hidePassword ? "eye-off-outline" : "eye-outline"} />)}

            </View>
            {error && (<Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>{error}</Text>)}

        </View>
    )
}

const style = StyleSheet.create({
    label: {
        marginVertical: 15,
        fontSize: 14,
        color: COLORS.grey,
        marginLeft: 17
    },
    inputContainer: {
        height: 55,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
        borderRadius: 15,

    }
}
)

export default Input;
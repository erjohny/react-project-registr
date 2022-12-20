import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import COLORS from "../../conts/colors";
import Button from "../components/button";
import Input from "../components/input";
import Loader from "../components/loader";

const RegistrationScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError("Пожалуйста введите логин", 'email');
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError("Введите корректный email адрес", 'email')
            valid = false;
        }
        if (!inputs.fullname) {
            handleError("Пожалуйста введите ФИО", 'fullname');
            valid = false;
        }
        if (!inputs.phone) {
            handleError("Пожалуйста введите номер телефона", 'phone');
            valid = false;
        }
        if (!inputs.password) {
            handleError("Пожалуйста введите пароль", 'password');
            valid = false;
        } else if (inputs.password.length < 5) {
            handleError("Минимальная длина пароля 5 символов ", 'password');
            valid = false;
        }

        if (valid) {
            register();
        }

    };
    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs));
                navigation.navigate("LoginScreen")
            } catch (error) {
                Alert.alert("Ошибка", "Что-то пошло не так")
            }
        }, 3000);
    };
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }))
    };

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
            }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Регистрация
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
                    Введите свои данные для регистрации
                </Text>
                <View style={{ marginVertical: 20, }}>
                    <Input
                        placeholder="Введите email"
                        iconName="mail-outline"
                        label="Email"
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, 'email')
                        }}
                        onChangeText={text => handleOnChange(text, 'email')}

                    />
                    <Input
                        placeholder="Введите ФИО"
                        iconName="person-outline"
                        label="ФИО"
                        error={errors.fullname}
                        onFocus={() => {
                            handleError(null, 'fullname')
                        }}
                        onChangeText={text => handleOnChange(text, "fullname")}
                    />
                    <Input
                        keyboardType="numeric"
                        placeholder="Введите номер телефона"
                        iconName="call-outline"
                        label="Номер телефона"
                        error={errors.phone}
                        onFocus={() => {
                            handleError(null, 'phone')
                        }}
                        onChangeText={text => handleOnChange(text, "phone")}

                    />
                    <Input
                        placeholder="Введите пароль"
                        iconName="lock-closed-outline"
                        label="Пароль"
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, 'password')
                        }}
                        onChangeText={text => handleOnChange(text, "password")}
                        password

                    />
                    <Button title="Регистрация" onPress={validate} />

                    <Text
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={{ color: COLORS.black, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                        У вас уже есть аккаунт? Войти.</Text>


                </View>
            </ScrollView>

        </View>
    );
};


export default RegistrationScreen;


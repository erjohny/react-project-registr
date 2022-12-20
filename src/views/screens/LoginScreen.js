import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Keyboard, SafeAreaView, ScrollView, Text, View, Picker } from "react-native";
import COLORS from "../../conts/colors";
import Button from "../components/button";
import Input from "../components/input";
import Loader from "../components/loader";
import HomeScreen from "./HomeScreen";
import Ionicons from 'react-native-vector-icons/Ionicons'

const LoginScreen = ({ navigation }) => {
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
        }

        if (!inputs.password) {
            valid = false;
            handleError("Пожалуйста введите пароль", 'password');

        }
        if (valid) {
            login();
        }

    };
    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            let userData = await AsyncStorage.getItem("user");
            if (userData) {
                userData = JSON.parse(userData);
                if (inputs.email == userData.email && inputs.password == userData.password) {
                    AsyncStorage.setItem('user', JSON.stringify({ ...userData, loggedIn: true }),
                    );
                    navigation.navigate(HomeScreen);
                } else {
                    Alert.alert('Ошибка', 'Неверные данные');
                }
            } else {
                Alert.alert('Ошибка', 'Пользователь не существует');
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
        <SafeAreaView style={{ backgroundColor: COLORS.white }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
            }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Вход
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
                    Введите свои данные для входа
                </Text>
                <View style={{ marginVertical: 20 }}>
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
                    <Button title="Вход" onPress={validate} />

                    <Text
                        style={{ color: COLORS.blue, textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>
                        Забыли пароль?</Text>




                    <Text
                        onPress={() => navigation.navigate('RegistrationScreen')}
                        style={{ color: COLORS.black, textAlign: 'center', fontSize: 16, fontWeight: 'bold', padding: 20 }}>
                        У вас нет аккаунта? Зарегестрироваться.</Text>




                </View>
            </ScrollView>
        </SafeAreaView>
    );

};

export default LoginScreen;
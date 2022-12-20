import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Button from "../components/button";

const HomeScreen = ({ navigation }) => {
    const [userDetails, setUserDetails] = React.useState();
    React.useEffect(() => {
        getUserDetails()
    }, [])
    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };
    const logout = () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: false }),
        )
        navigation.navigate('LoginScreen');
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}>Добро пожаловать {userDetails?.fullname}</Text>
            <Button title="Выйти" onPress={logout} />
        </View>
    )
};

export default HomeScreen;
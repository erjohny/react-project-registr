import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../src/views/screens/LoginScreen";
import RegistrationScreen from "../src/views/screens/RegistrationScreen";
import HomeScreen from "../src/views/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../src/views/components/loader";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Input, TouchableOpacity, Picker } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const Stack = createNativeStackNavigator();


const MainContainer = () => {
    const [initialRouteName, setInitialRouteNamec] = React.useState('');
    React.useEffect(() => {
        setTimeout(authUser, 2000);
    }, [])
    const [language, setLanguage] = useState('russian');
    const authUser = async () => {
        try {
            let userData = await AsyncStorage.getItem('user');
            if (userData) {
                userData = JSON.parse(userData);
                if (userData?.loggdIn) {
                    setInitialRouteNamec('HomeScreen');
                } else {
                    setInitialRouteNamec('LoginScreen');
                }
            } else {
                setInitialRouteNamec('RegistrationScreen');
            }
        } catch (error) {
            setInitialRouteNamec('RegistrationScreen')
        }
    };
    return (

        <NavigationContainer>
            {initialRouteName == '' ? (
                <Loader visible={true} />
            ) : (
                <>

                    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    </Stack.Navigator>
                </>
            )}
        </NavigationContainer>

    )
}
export default MainContainer;
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./src/views/screens/LoginScreen";
// import RegistrationScreen from "./src/views/screens/RegistrationScreen";
// import HomeScreen from "./src/views/screens/HomeScreen";


// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
// export default App;


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './screen/MainContainer';

export default function App() {
  return (
    <MainContainer />
  );
}


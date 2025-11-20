import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

import Layout from "../components/Layout";
import { RootStackParamList } from "./Types";
import RegisterBusinessScreen from "../screens/RegisterScreen";
import AboutScreen from "../screens/AboutUsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const createWrappedScreen =
  (ScreenComponent: React.ComponentType<any>) => (props: any) => {
    const activeScreenName = props.route.name;

    const handleNavigate = (screen: string) => {
      props.navigation.navigate(screen);
    };

    return (
      <Layout active={activeScreenName} onNavigate={handleNavigate} navigation={props.navigation}>
        <ScreenComponent {...props} />
      </Layout>
    );
  };

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={createWrappedScreen(HomeScreen)} />
      <Stack.Screen name="Login" component={createWrappedScreen(LoginScreen)} />
      <Stack.Screen name="RegisterBusiness" component={createWrappedScreen(RegisterBusinessScreen)} />
      <Stack.Screen name="AboutUs" component={createWrappedScreen(AboutScreen)} />
    </Stack.Navigator>
  );
}

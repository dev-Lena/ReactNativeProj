import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React from "react";
import {StyleSheet, Text, View, Image, useColorScheme} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons"
import { useAssets } from 'expo-asset';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Tabs from "./navigation/Tabs";
import { LogBox } from 'react-native';
import Root from "./navigation/Root";

LogBox.ignoreLogs(['Require cycle:'])

export default function App() {
    const [assets] = useAssets([require("./b9472222.png")]);
    const [loaded] = Font.useFonts(Ionicons.font);
    const isDark = useColorScheme() === "dark";

    if (!assets || !loaded) {
        return (
            <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Hi incomplete SplashScreen Demo! 👋</Text>
                <Entypo name="rocket" size={30}/>
            </View>
            );
    }
    return (
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <Root />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React from "react";
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons"
import { useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query'
import { LogBox } from 'react-native';
import Root from "./navigation/Root";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./styled";

LogBox.ignoreLogs(['Require cycle:'])
const queryClient = new QueryClient();

export default function App() {
    const isDark = useColorScheme() === "dark";
    const [assets] = useAssets([require("./b9472222.png")]);
    const [loaded] = Font.useFonts(Ionicons.font);
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
        <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
            <Root />
        </NavigationContainer>
        </ThemeProvider>
        </QueryClientProvider>
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

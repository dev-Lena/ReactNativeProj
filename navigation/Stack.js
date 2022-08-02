import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <Text>Go To Two</Text>
    </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <Text>Go To Three</Text>
    </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
        <Text>Go To Search Tab</Text>
    </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => <NativeStack.Navigator
    screenOptions={{
        headerBackTitleVisible: false
    }}>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
</NativeStack.Navigator>

export  default  Stack;
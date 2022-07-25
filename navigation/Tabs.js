import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from "../Screens/Movies";
import TV from "../Screens/TV";
import Search from "../Screens/Search";
import {Text, useColorScheme, View} from "react-native";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    const scheme = useColorScheme();
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: colors(scheme).activeTint,
            tabBarInactiveTintColor: colors(scheme).inactiveTint,
            tabBarStyle: {
                backgroundColor: colors(scheme).bgColor
            },
            headerStyle: {
                backgroundColor: colors(scheme).bgColor
            },
            headerTitleStyle: {
                color: colors(scheme).color
            }
        }}>
            <Tab.Screen name="Movies" component={Movies} />
            <Tab.Screen name="TV" component={TV} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    );
};

export default Tabs;
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from "../Screens/Movies";
import TV from "../Screens/TV";
import Search from "../Screens/Search";
import {useColorScheme} from "react-native";
import colors from "../colors";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const scheme = useColorScheme();
    return (
        <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: colors(scheme).bgColor
        }}
            screenOptions={{
            unmountOnBlur: true,
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
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600"
            }
        }}>
            <Tab.Screen
                name="Movies"
                component={Movies}
                options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size} />
                }
            }}/>
            <Tab.Screen
                name="TV"
                component={TV}
                options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size} />
                }
            }}/>
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
                }
            }}/>
        </Tab.Navigator>
    );
};

export default Tabs;
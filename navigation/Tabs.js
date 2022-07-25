import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from "../Screens/Movies";
import TV from "../Screens/TV";
import Search from "../Screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
        <Tab.Navigator>
            <Tab.Screen name="Movies" component={Movies} />
            <Tab.Screen name="TV" component={TV} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
);

export default Tabs;
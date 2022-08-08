import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from "../Screens/Detail";
import colors from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return (
        <NativeStack.Navigator
            screenOptions={{
               headerBackTitleVisible: false,
               headerStyle: {
                   backgroundColor: colors(scheme).bgColor
                },
               headerTitleStyle: {
                   color: colors(scheme).color
               },
          }}>
            <NativeStack.Screen name="Detail" component={Detail}/>
        </NativeStack.Navigator>
    );
}

export  default  Stack;

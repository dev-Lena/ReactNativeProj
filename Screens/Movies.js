import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Tabs from "../navigation/Tabs";

const Movies = ( {navigation: { navigate } }) => (
    <TouchableOpacity
        onPress={() => navigate("Stack", {screen: "Three"})}
        style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text> Movies </Text>
    </TouchableOpacity>
);

export default Movies;
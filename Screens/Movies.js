import React from "react";
import styled from "styled-components/native";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

const Btn = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
    color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Movies = ( {navigation: { navigate } }) => (
    <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
        <Title selected={false}>Movies</Title>
        <Title selected={true}>Movies</Title>
    </Btn>
);

export default Movies;

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "blue"
    }
});
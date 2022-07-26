import React from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const Btn = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
`;
export default Movies;

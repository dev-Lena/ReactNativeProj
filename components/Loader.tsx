import React from "react";
import styled from "styled-components";
import {ActivityIndicator} from "react-native";

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
 `;

const Loader = () => (
    <Wrapper>
        <ActivityIndicator/>
    </Wrapper>
);

export default Loader;

import React, {useEffect} from "react";
import styled from "styled-components";
import {ImageBackground} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Movie} from "../api";
import TV from "./TV";
import Poster from "../components/Poster";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
    Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
    navigation: { setOptions },
    route: { params },
}) => {
    useEffect(() => {
        setOptions({
            title: 'original_title' in params
                ? params.original_title
                : params.original_name,
        });
    }, []);
    return (
        <Container>
            <Poster path={params.poster_path || ""}/>
        </Container>
    )
};

export default  Detail;

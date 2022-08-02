import React, {useState} from "react";
import styled from "styled-components/native";
import {Alert} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {moviesAPI, tvAPI} from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`;

const Search = () => {
    const [query, setQuery] = useState("");
    const {isLoading: moviesLoading, data: moviesData, refetch: searchMovies} = useQuery(
        ["searchMovies", query],
        moviesAPI.search,
        {
            enabled: false,
        }
    );
    const {isLoading: tvLoading, data: tvData, refetch: searchTV} = useQuery(
        ["searchTV", query],
        tvAPI.search,
        {
            enabled: false,
        }
    );
    const onChangeText = (text: string) => setQuery(text);
    const onSubmit = () => {
      if (query === "") {
          return ;
      }
        searchMovies();
        searchTV();
    };
    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
        </Container>
    );
};

export default Search;
import React from "react";
import styled from "styled-components";
import VMedia from "./VMedia";
import {FlatList} from "react-native";

const ListContainer = styled.View`
   margin-bottom: 40px;
 `;

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
    width: 20px;
`;

interface  HlistProps {
    title: string;
    data: any[]
}
const HList: React.FC<HlistProps> = ({ title, data }) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={HListSeperator}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            renderItem={({ item }) => (
                <VMedia
                    posterPath={item.poster_path}
                    originalTitle={ item.original_title ?? item.original_name }
                    voteAverage={item.vote_average}
                />
            )}
        />
    </ListContainer>
);
export default HList;

import React from "react";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import {FlatList} from "react-native";
import {Movie, TV} from "../api";
import {fetchMore, FetchNext} from "../utils";

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

export const HListSeparator = styled.View`
   width: 20px;
 `;

interface HListProps {
    title: string;
    data: Movie[] | TV[] | undefined;
    hasNext: boolean | undefined;
    fetchNext: FetchNext;
}
const HList: React.FC<HListProps> = ({ title, data, hasNext, fetchNext }) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList
            data={data}
            horizontal
            onEndReached={() => fetchMore(hasNext, fetchNext)}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={HListSeparator}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            keyExtractor={(item) => item.id + ""}
            renderItem={({ item }) => (
                <VMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={ item.original_title ?? item.original_name }
                    voteAverage={item.vote_average}
                    fullData={item}
                />
            )}
        />
    </ListContainer>
);
export default HList;

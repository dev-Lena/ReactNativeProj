import React, { useState } from "react";
import styled from "styled-components/native";
import {ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from 'react-native-swiper';
import {useQuery, useQueryClient} from '@tanstack/react-query'
import Slide from "../components/Slides";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import {moviesAPI} from "../api";

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
 `;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    margin-bottom: 20px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
   margin-bottom: 40px;
 `;

const ComingSoonTitle = styled(ListTitle)`
   margin-bottom: 20px;
 `;

const VSeparater = styled.View`
    width: 20px;
`;

const HSeparater = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const queryClient = useQueryClient();
    const {isLoading: nowPlayingLoading,
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery(
        ['movies','nowPlaying'],
        moviesAPI.nowPlaying
    );
    const {isLoading: upcomingLoading,
        data: upcomingData,
        isRefetching: isRefetchingUpcoming,
    } = useQuery(
        ['movies', 'upcoming'],
        moviesAPI.upcoming
    );
    const {isLoading: trendingLoading,
        data: trendingData,
        isRefetching: isRefetchingTrending,
    } = useQuery(
        ['movies', 'trending'],
        moviesAPI.trending
    );
    const onRefresh = async () => {
        queryClient.refetchQueries(['movies'])
    };
    const renderVMedia = ({ item }) => (
        <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
    );
    const renderHMedia = ({ item }) => (
        <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
        />
    );
    const movieKeyExtractor = (item) => item.id + ""
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading
    const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending
    return loading ? (
        <Loader>
            <ActivityIndicator size="small" />
        </Loader>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        containerStyle={{
                            marginBottom: 40,
                            width: "100%",
                            height: SCREEN_HEIGHT / 4,
                        }}
                    >
                        {nowPlayingData?.results.map((movie) => (
                            <Slide
                                key={movie.id}
                                backdropPath={movie.backdrop_path}
                                posterPath={movie.poster_path}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                            />
                        ))}
                    </Swiper>
                    <ListContainer>
                        <ListTitle>Trending Movies</ListTitle>
                        <TrendingScroll
                            data={trendingData?.results}
                            horizontal
                            keyExtractor={ movieKeyExtractor }
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 30 }}
                            ItemSeparatorComponent={ VSeparater }
                            renderItem={renderVMedia}
                        />
                    </ListContainer>
                    <ComingSoonTitle>Coming soon</ComingSoonTitle>
                </>
            }
            data={upcomingData?.results}
            keyExtractor={ movieKeyExtractor }
            ItemSeparatorComponent={ HSeparater }
            renderItem={renderHMedia}
        />
    );
};

export default Movies;

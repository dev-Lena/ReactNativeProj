import React, {useState} from "react";
import styled from "styled-components/native";
import {Dimensions, FlatList} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from 'react-native-swiper';
import {useQuery, useQueryClient} from '@tanstack/react-query'
import Slide from "../components/Slides";
import HMedia from "../components/HMedia";
import {MovieResponse, Movie, moviesAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    margin-bottom: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
   margin-bottom: 20px;
 `;

const HSeparater = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const {isLoading: nowPlayingLoading,
        data: nowPlayingData,
    } = useQuery<MovieResponse>(
        ['movies','nowPlaying'],
        moviesAPI.nowPlaying
    );
    const {isLoading: upcomingLoading,
        data: upcomingData,
    } = useQuery<MovieResponse>(
        ['movies', 'upcoming'],
        moviesAPI.upcoming
    );
    const {isLoading: trendingLoading,
        data: trendingData,
    } = useQuery<MovieResponse>(
        ['movies', 'trending'],
        moviesAPI.trending
    );
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(['movies'])
        setRefreshing(false);
    };
    const movieKeyExtractor = (item: Movie) => item.id + ""
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading
    return loading ? (
        <Loader/>
    ) : upcomingData ? (
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
                                backdropPath={movie.backdrop_path || ""}
                                posterPath={movie.poster_path || ""}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                            />
                        ))}
                    </Swiper>
                        {trendingData ? (
                            <HList title="Trending Movies" data={trendingData.results} />
                        ) : null}
                    <ComingSoonTitle>Coming soon</ComingSoonTitle>
                </>
            }
            data={upcomingData?.results}
            keyExtractor={ (item) => item.id + ""  }
            ItemSeparatorComponent={ HSeparater }
            renderItem={({ item }) => (
                <HMedia
                posterPath={item.poster_path || ""}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
                />
                )}
        />
    ) : null;
};

export default Movies;

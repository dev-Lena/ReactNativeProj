import React, {useState} from "react";
import styled from "styled-components/native";
import {Alert, Dimensions, FlatList} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from 'react-native-swiper';
import {useInfiniteQuery, useQuery, useQueryClient} from '@tanstack/react-query'
import Slide from "../components/Slides";
import HMedia from "../components/HMedia";
import {MovieResponse, Movie, moviesAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import {hasNextPage} from "@tanstack/react-query/build/types/packages/query-core/src/infiniteQueryBehavior";
import {fetchMore} from "../utils";

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
        hasNextPage: upcomingHasNext,
        fetchNextPage: upcomingFetchNext,
    } = useInfiniteQuery(
        ['movies', 'upcoming'],
        moviesAPI.upcoming, {
            getNextPageParam: (currentPage) => {
                const nextPage = currentPage.page + 1
                return nextPage > currentPage.total_pages ? null : nextPage;
            },
        }
    );
    const {
        isLoading: trendingLoading,
        data: trendingData,
        hasNextPage: trendingHasNext,
        fetchNextPage: trendingFetchNext,
    } = useInfiniteQuery(
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
            onEndReached={() => fetchMore(upcomingHasNext, upcomingFetchNext)}
            onEndReachedThreshold={0.3}
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
                                fullData={movie}
                            />
                        ))}
                    </Swiper>
                        {trendingData ? (
                            <HList
                                title="Trending Movies"
                                data={trendingData.pages.map((page) => page.results).flat()}
                                hasNext={trendingHasNext}
                                fetchNext={trendingFetchNext}
                            />
                        ) : null}
                    <ComingSoonTitle>Coming soon</ComingSoonTitle>
                </>
            }
            data={upcomingData.pages.map((page) => page.results).flat()}
            keyExtractor={ (item, index) => item.id + index.toString()  }
            ItemSeparatorComponent={ HSeparater }
            renderItem={({ item }) => (
                <HMedia
                posterPath={item.poster_path || ""}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
                fullData={item}
                />
                )}
        />
    ) : null;
};

export default Movies;


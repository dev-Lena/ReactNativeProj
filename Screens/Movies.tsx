import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from 'react-native-swiper';
import Slide from "../components/Slides";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
const API_KEY = 'f6a42c5f7ed6fa7bab7aa1e941eea383'

const Container = styled.ScrollView`
`;

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

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);
    const getTrending = async() => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            )
        ).json();
        setTrending(results);
    }
    const getUpcoming = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )
        ).json();
        setUpcoming(results);
    };
    const getNowPlaying = async () => {
        const { results } = await (
            await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )
        ).json();
        setNowPlaying(results);
    };
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    }
    useEffect(() => {
        getData();
        setLoading(false);
    }, []);
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };
    return loading ? (
        <Loader>
            <ActivityIndicator size="small" />
        </Loader>
    ) : (<Container
            refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
        >
        <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={2}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
                marginBottom: 30,
                width: "100%",
                height: SCREEN_HEIGHT / 4
            }}
        >
            {nowPlaying.map((movie) => (
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
                    data={trending}
                    horizontal
                    keyExtractor={(item) => item.id + ""}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 30 }}
                    ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
                    renderItem={({ item }) => (
                        <VMedia
                            posterPath={item.poster_path}
                            originalTitle={item.original_title}
                            voteAverage={item.vote_average}
                        />
                    )}
                />
            </ListContainer>
            <ComingSoonTitle>Coming soon</ComingSoonTitle>
            <FlatList
                data={upcoming}
                keyExtractor={(item) => item.id + ""}
                ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                renderItem={({item}) => <HMedia
                key={item.id}
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
                />}
            />
    </Container>
    );
};

export default Movies;

import React, {useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {tvAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import Movies from "./Movies";

const TV = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefereshing] = useState(false)
    const {isLoading: todayLoading,
        data: todayData,
    } = useQuery(
        ['tv', 'today'],
         tvAPI.airingToday
    );
    const {isLoading: trendingLoading,
        data: trendingData,
    } = useQuery(
        ['tv', 'trending'],
        tvAPI.trending
    );
    const {isLoading: topLoading,
        data: topData,
    } = useQuery(
        ['tv', 'top'],
        tvAPI.topRated
    );
    const onRefresh = async() => {
        setRefereshing(true)
        await queryClient.refetchQueries(['tv']);
        setRefereshing(false)
    }
    const loading = todayLoading || topLoading || trendingLoading;

    if (loading) {
        return  <Loader />;
    }
    return (
        <ScrollView
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            contentContainerStyle={{ paddingVertical: 30}}>
            <HList title="Trending TV" data={trendingData.results}/>
            <HList title="Airing Today" data={todayData.results}/>
            <HList title="Top Rated TV" data={topData.results}/>
        </ScrollView>
  );
};

export default TV;

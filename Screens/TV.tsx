import React from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {tvAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import Movies from "./Movies";

const TV = () => {
    const queryClient = useQueryClient();
    const {isLoading: todayLoading,
        data: todayData,
        isRefetching: todayRefetching
    } = useQuery(
        ['tv', 'today'],
         tvAPI.airingToday
    );
    const {isLoading: trendingLoading,
        data: trendingData,
        isRefetching: trendingRefetching
    } = useQuery(
        ['tv', 'trending'],
        tvAPI.trending
    );
    const {isLoading: topLoading,
        data: topData,
        isRefetching: topRefetching
    } = useQuery(
        ['tv', 'top'],
        tvAPI.topRated
    );
    const onRefresh = () => {
        queryClient.refetchQueries(['tv']);
    }
    const loading = todayLoading || topLoading || trendingLoading;
    const refreshing = todayRefetching || trendingRefetching || topRefetching;
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

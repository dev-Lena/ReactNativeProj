import React from "react";
import {ScrollView} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {tvAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const TV = () => {
    const {isLoading: todayLoading, data: todayData} = useQuery(['tv', 'today'], tvAPI.airingToday)
    const {isLoading: trendingLoading, data: trendingData} = useQuery(['tv', 'trending'], tvAPI.trending)
    const {isLoading: topLoading, data: topData} = useQuery(['tv', 'top'], tvAPI.topRated)
    const loading = todayLoading || topLoading || trendingLoading;
    if (loading) {
        return  <Loader />;
    }
    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 30}}>
            <HList title="Trending TV" data={trendingData.results}/>
            <HList title="Airing Today" data={todayData.results}/>
            <HList title="Top Rated TV" data={topData.results}/>
        </ScrollView>
  );
};


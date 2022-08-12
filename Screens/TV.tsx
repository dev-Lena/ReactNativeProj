import React, {useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import {tvAPI} from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import {getNextPage} from "../utils";

const TV = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefereshing] = useState(false)
    const {isLoading: todayLoading,
        data: todayData,
        hasNextPage: todayHasNext,
        fetchNextPage: todayFetchNext,
    } = useInfiniteQuery(
        ['tv', 'today'],
         tvAPI.airingToday, {
            keepPreviousData: true,
            getNextPageParam: getNextPage,
        }
    );
    const {isLoading: trendingLoading,
        data: trendingData,
        hasNextPage: trendingHasNext,
        fetchNextPage: trendingFetchNext,
    } = useInfiniteQuery(
        ['tv', 'trending'],
        tvAPI.trending, {
            keepPreviousData: true,
            getNextPageParam: getNextPage,
        }
    );
    const {isLoading: topLoading,
        data: topData,
        hasNextPage: topHasNext,
        fetchNextPage: topFetchNext,
    } = useInfiniteQuery(
        ['tv', 'top'],
        tvAPI.topRated, {
            keepPreviousData: true,
            getNextPageParam: getNextPage,
        }
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
            <HList
                title="Trending TV"
                data={trendingData.pages.map((page) => page.results).flat()}
                hasNext={trendingHasNext}
                fetchNext={trendingFetchNext}
            />
            <HList
                title="Airing Today"
                data={todayData.pages.map((page) => page.results).flat()}
                hasNext={todayHasNext}
                fetchNext={todayFetchNext}
            />
            <HList
                title="Top Rated TV"
                data={topData.pages.map((page) => page.results).flat()}
                hasNext={topHasNext}
                fetchNext={topFetchNext}
            />
        </ScrollView>
  );
};

export default TV;

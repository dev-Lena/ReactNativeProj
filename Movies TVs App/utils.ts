import {MovieResponse, TVResponse} from "./api";
import {InfiniteQueryObserverResult} from "@tanstack/react-query";
import Loader from "./components/Loader";
import React from "react";

export const makeImgPath = (
    img: string,
    width: string = "w500"
) =>
     `https://image.tmdb.org/t/p/${width}${img}`;

type MovieFetch = Promise<InfiniteQueryObserverResult<MovieResponse, unknown>>;
type TVFetch = Promise<InfiniteQueryObserverResult<TVResponse, unknown>>

export type FetchNext = () =>  TVFetch | MovieFetch
export const fetchMore = (hasNext:boolean | undefined,fetchNext:FetchNext) => hasNext ? fetchNext() : null

export const getNextPage = (currentPage) => {
    const nextPage = currentPage.page + 1;
    return nextPage > currentPage.total_pages ? null : nextPage;
};

export const renderFooterComponent = (isFetchingNextPage: boolean) => (
    isFetchingNextPage ? Loader : null
);

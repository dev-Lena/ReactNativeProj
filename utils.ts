import {MovieResponse} from "./api";
import {InfiniteQueryObserverResult} from "@tanstack/react-query";

export const makeImgPath = (
    img: string,
    width: string = "w500"
) =>
     `https://image.tmdb.org/t/p/${width}${img}`;

type MovieFetch =Promise<InfiniteQueryObserverResult<MovieResponse, unknown>>;
type TVFetch =Promise<InfiniteQueryObserverResult<TVResponse, unknown>>

export type FetchNext = ()=>  TVFetch | MovieFetch
export const fetchMore = (hasNext:boolean | undefined,fetchNext:FetchNext) => hasNext ? fetchNext():null

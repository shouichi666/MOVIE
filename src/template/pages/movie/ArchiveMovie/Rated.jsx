import React, { useCallback, useContext } from "react";
import AppContext from "../../../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { _MapXsliderBox } from "../../../../hooks/hoge";
import InfiniteScroll from "react-infinite-scroller";

const Rated = () => {
  const { state, dispatch } = useContext(AppContext);

  const onClickAddRecest = useCallback(
    (num) => {
      return theMovieDb.movies.getTopRated(
        { page: num },
        (movie) => {
          dispatch({ type: "ADD_TOP_RATED_MOVIE", rated: JSON.parse(movie) });
        },
        (error) => console.log(error)
      );
    },
    [dispatch]
  );

  return (
    <>
      {/* メイン */}
      <InfiniteScroll
        loadMore={onClickAddRecest}
        hasMore={state.movie.rated.results.length > 0 ? true : false}
        pageStart={state.movie.rated.page}
      >
        <div className='flexWrap'>
          {_MapXsliderBox(state.movie.rated.results, "movie")}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Rated;

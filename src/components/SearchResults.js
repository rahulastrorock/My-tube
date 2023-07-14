import React from "react";
import { Link } from "react-router-dom";
import SearchResultCard from "./SearchResultCard";
import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import Sidebar from "./Sidebar";

const SearchResults = () => {
  //subscribe to the store
  const videoList = useSelector((store) => store.searchResults);
  console.log(videoList);
  return (
    <div className="">
      <ButtonList />
      <Sidebar />
      <h1 className="pt-40 font-bold text-2xl pb-5 flex items-center justify-center ">
        Search Results
      </h1>
      {videoList?.map((video) => {
        return (
          <Link to={"/watch?v=" + video.id.videoId} key={video.id.videoId}>
            <SearchResultCard data={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;

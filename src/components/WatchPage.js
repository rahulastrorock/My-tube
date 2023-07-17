import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
const WatchPage = () => {
  const [searchParams] = useSearchParams(); //this is a hook to get the search params from the url
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  return (
    <div className="flex flex-col pt-2 w-full">
      <Sidebar />
      <div className="px-5 flex">
        <div className="m-3">
          <iframe
            width="800"
            height="500"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?autoplay=1"
            }
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="m-3 pt-16 w-full">
          <LiveChat />
        </div>
      </div>
      <div className="w-2/3">
        <CommentsContainer />
      </div>
    </div>
  );
};

export default WatchPage;

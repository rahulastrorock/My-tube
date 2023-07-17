import React from "react";

const VideoCards = ({ info }) => {
  // console.log(info);
  const { snippet, statistics } = info;
  // console.log(snippet);

  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="p-2 m-2 w-64 shadow-lg bg-gray-200">
      <img className="rounded-lg" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

///this is the example of higher order component
//here we are modifying the VideoCards component and exporting it .
// it is like some cards in original youtube shows ads and some dont
// that ads card is different from the normal card and can be implemented like this
export const AddVideoCards = ({ info }) => {
  return (
    <div className="p-1 m-1 border border-red-900">
      <VideoCards info={info} />
      <h1>Ads</h1>
    </div>
  );
};

export default VideoCards;

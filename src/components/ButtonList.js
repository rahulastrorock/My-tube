import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "Cooking",
  "News",
  "Movies",
  "TV Shows",
  "Fashion",
];

const ButtonList = () => {
  return (
    <div className="flex fixed mt-20 bg-white">
      {list.map((item) => (
        <Button name={item} />
      ))}
    </div>
  );
};

export default ButtonList;

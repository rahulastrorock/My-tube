import React from "react";

const FixedSidebar = () => {
  return (
    <div className="p-5 shadow-lg w-[85rem] mt-20 ">
      <ul className="fixed">
        <li className="font-bold pt-5">Home</li>
        <li className="font-bold pt-5">Shorts</li>
        <li className="font-bold pt-5">Originals</li>
        <li className="font-bold pt-5">Music</li>
        <li className="font-bold pt-5">Library</li>
        <li className="font-bold pt-5">Downloads</li>
      </ul>
    </div>
  );
};

export default FixedSidebar;

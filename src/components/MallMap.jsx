import React from "react";
import ImageZoomInOut from "./ImageZoomInOut";
import Map1 from "./Images/Map1.png";

const MallMap = (props) => {
  return (
    <div>
      <ImageZoomInOut imageUrl={props.imageUrl} />
    </div>
  );
};

export default MallMap;

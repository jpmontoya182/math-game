import React from "react";
import utils from "../utils.js";

const Starts = (props) => (
  <>
    {utils.range(1, props.stars).map((starId) => (
      <div key={starId} className="star" />
    ))}
  </>
);

export default Starts;

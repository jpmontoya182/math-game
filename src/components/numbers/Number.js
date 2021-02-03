import React from "react";

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

const NumberId = (props) => {
  const { numberId, status, onClick } = props;
  return (
    <button
      className="number"
      type="button"
      style={{ backgroundColor: colors[status] }}
      onClick={() => onClick(numberId, status)}
    >
      {numberId}
    </button>
  );
};

export default NumberId;

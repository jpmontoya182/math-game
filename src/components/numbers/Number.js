import React from "react";

function NumberId(props) {
  const { numberId } = props;
  return (
    <button
      className="number"
      type="button"
      onClick={() => console.log("Num", numberId)}
    >
      {numberId}
    </button>
  );
}

export default NumberId;

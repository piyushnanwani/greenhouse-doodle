import React from 'react';

// svg of the following
export default function NavigationBox({
  viewBoxHeight,
  setViewBoxHeight,
}) {
  return (
    <div className="navigationBox noselect">
      <div
        className="navigationBoxBtns"
        onClick={() => setViewBoxHeight(viewBoxHeight - 50)}
      >
        +
      </div>
      <div
        className=" navigationBoxBtns"
        onClick={() => setViewBoxHeight(viewBoxHeight + 50)}
      >
        -
      </div>
    </div>
  );
}

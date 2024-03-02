import React from "react";

const BadgeNumbersComponent = ({ number }) => {
  return (
    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-whitesmoke bg-cognac rounded-full tracking-normal">
      {number}
    </span>
  );
};

export default BadgeNumbersComponent;

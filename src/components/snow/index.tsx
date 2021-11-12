import React from "react";
import useSnowData from "hook/useSnow";

const Snows = ({ color }: { color: string }) => {
  const [snows] = useSnowData(70);

  return (
    <>
      {snows.map((data, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "35px",
            color: `${color}`,
            left: `${data.x}px`,
            top: `${data.y}px`,
            cursor: "default",
            userSelect: "none",
          }}
        >
          *
        </div>
      ))}
    </>
  );
};

export const FallingSnow = React.memo(Snows);

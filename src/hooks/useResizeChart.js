import { useEffect, useState } from "react";

const useResizeChart = (parentRef) => {
  const [canvasSize, setCanvasSize] = useState({ width: "100%" });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: parentRef.current.clientWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentRef]);

  return { canvasSize }
};

export default useResizeChart;

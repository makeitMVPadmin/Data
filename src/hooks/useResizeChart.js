import { useEffect, useState } from "react";

const useResizeChart = (parentRef) => {
  const [canvasSize, setCanvasSize] = useState({ width: "100%" });

  useEffect(() => {
    console.log(parentRef.current.clientWidth)
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
  }, []);

  return { canvasSize }
};

export default useResizeChart;

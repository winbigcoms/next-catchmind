import { useCallback, useState } from "react";

const useColors: () => { color: string; changeColor: (color: string) => void } =
  () => {
    const [color, setColor] = useState("#000000");
    const changeColor = useCallback((color: string) => {
      setColor(() => color);
    }, []);
    return { color, changeColor };
  };
export default useColors;

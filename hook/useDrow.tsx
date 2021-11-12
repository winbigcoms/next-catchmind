import { useCallback, useState } from "react";

interface mousePosition {
  x: number;
  y: number;
}

const useDraw: () => {
  mousePosition: mousePosition;
  onPaint: boolean;
  changeMousePosition: (position: mousePosition) => void;
  changePaintState: (state: boolean) => void;
} = () => {
  const [mousePosition, setMousePosition] = useState<mousePosition>({
    x: 0,
    y: 0,
  });
  const [onPaint, setPaintState] = useState(false);
  const changeMousePosition = useCallback((position: mousePosition) => {
    setMousePosition(() => position);
  }, []);
  const changePaintState = useCallback((state: boolean) => {
    setPaintState(() => state);
  }, []);
  return { mousePosition, onPaint, changeMousePosition, changePaintState };
};

export default useDraw;

import { useCallback, useEffect, useState } from "react";

interface snowData {
  x: number;
  y: number;
  speedOfFall: number;
  speedOfWind: number;
  step: number;
}

const useSnowData = (count: number): [snowData[]] => {
  const [snowDatas, setSnowData] = useState<snowData[]>([]);
  const newSnowData = useCallback(
    (datas: snowData[]) =>
      datas.map((data) => {
        let x = data.x + Math.cos(data.speedOfWind);
        let y = data.y + data.speedOfFall;
        let speedOfWind = data.speedOfWind;
        let speedOfFall = data.speedOfFall;
        const step = data.step;
        if (y >= window.innerHeight - 60) {
          y = 0;
          x = Math.floor(Math.random() * window.innerWidth);
          speedOfFall = Math.random() * 2 + 1;
          speedOfWind = 1;
        }
        if (x > window.innerWidth - 50) {
          x = window.innerWidth - 50;
        } else if (x < 50) {
          x = 50;
        }
        return { x, y, speedOfFall, speedOfWind, step };
      }),
    []
  );

  const setSnowPosition = () => {
    setSnowData((state) => newSnowData(state));
  };

  useEffect(() => {
    const datas: snowData[] = [];
    for (let i = 0; i < count; i++) {
      const data = {
        x: Math.floor(Math.random() * window.innerWidth - 10),
        y: Math.floor(Math.random() * window.innerHeight + 10),
        speedOfFall: Math.random() + 2,
        speedOfWind: 1,
        step: Math.random() * 0.1 + 0.05,
      };
      datas.push(data);
    }
    setSnowData(() => datas);
  }, []);

  useEffect(() => {
    const fall = setInterval(setSnowPosition, 50);
    return () => {
      clearInterval(fall);
    };
  }, []);

  return [snowDatas];
};

export default useSnowData;

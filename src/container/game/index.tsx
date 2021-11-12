import { useEffect } from "react";
import { openSocket } from "src/service";
import { GameHeader, GameBoard } from "src/components";

export const GameContainer = () => {
  const socket = openSocket();

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  });

  return (
    <>
      <GameHeader />
      <GameBoard socket={socket} />
    </>
  );
};

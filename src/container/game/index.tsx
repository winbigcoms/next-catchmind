import { useEffect } from "react";
import { openSocket } from "src/service";
import { GameHeader, GameBoard } from "src/components";
import { useDispatch } from "react-redux";
import { logoutUser } from "store/modules/user";

export const GameContainer = () => {
  const socket = openSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      socket.disconnect();
      dispatch(logoutUser());
    };
  });

  return (
    <>
      <GameHeader />
      <GameBoard socket={socket} />
      <div id="modal" />
    </>
  );
};

import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import { useRouter } from "next/router";

import { UserBox, CorrectModal, GameCanvas, InputAnswer } from "src/components";

import { LoginUser } from "store/modules/user/model";
import { SocketType } from "src/Types";

import rootReducer from "store/modules";

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 1440px;
  width: 1440px;
  margin: auto;
  flex-wrap: wrap;
`;

const UserRow = styled.div`
  width: 200px;
`;

const initUser = {
  name: "",
  nickName: "",
  img: "",
};

export type RootState = ReturnType<typeof rootReducer>;

export const GameBoard = ({ socket }: SocketType) => {
  const [users, setUsers] = useState<LoginUser[]>([]);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const [goldenCorrect, setGoldenCorrect] = useState({
    state: false,
    name: "",
  });

  const sendAnswer = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      socket.emit("chatting", { value, user: user.nickName });
      (e.target as HTMLInputElement).value = "";
    }
  }, []);

  const onCorrect = useCallback((data) => {
    setGoldenCorrect(() => ({ state: true, name: data }));
  }, []);

  const closeCorrect = useCallback(() => {
    setGoldenCorrect(() => ({ state: false, name: "" }));
  }, []);

  useEffect(() => {
    if (!user.name) {
      router.push("/");
    }
    socket.emit("users", user);

    socket.on("recivedUsers", (data) => {
      setUsers(() => data);
    });

    socket.on("goldenCorrect", (data) => {
      onCorrect(data);
      const timeOut = setTimeout(() => {
        closeCorrect();
        if (user.nickName === data) {
          socket.emit("newGame");
        }
        clearTimeout(timeOut);
      }, 4000);
    });

    socket.on("alreadLogin", () => {
      alert("이미 로그인된 아이디입니다.");
      router.push("/");
    });
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = "./img/12.png";
  }, []);

  return (
    <GameContainer>
      <UserRow>
        <UserBox
          user={users[0] ? users[0] : initUser}
          socket={socket}
          position={"left"}
        />
        <UserBox
          user={users[1] ? users[1] : initUser}
          socket={socket}
          position={"left"}
        />
        <UserBox
          user={users[2] ? users[2] : initUser}
          socket={socket}
          position={"left"}
        />
      </UserRow>
      <GameCanvas socket={socket} width={700} height={700} />
      <UserRow>
        <UserBox
          user={users[3] ? users[3] : initUser}
          socket={socket}
          position={"right"}
        />
        <UserBox
          user={users[4] ? users[4] : initUser}
          socket={socket}
          position={"right"}
        />
        <UserBox
          user={users[5] ? users[5] : initUser}
          socket={socket}
          position={"right"}
        />
      </UserRow>
      <InputAnswer sendAnswer={sendAnswer} />
      {goldenCorrect.state && (
        <CorrectModal name={goldenCorrect.name} open={goldenCorrect.state} />
      )}
    </GameContainer>
  );
};

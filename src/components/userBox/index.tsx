import React, { FC, useEffect } from "react";

import styled from "styled-components";

import useMessage from "src/hooks";

import { SocketType } from "src/Types";

import { LoginUser } from "store/modules/user/model";

const UserSit = styled.div`
  border: 1px solid #aaa;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 200px;
  img {
    height: 165px;
  }
  p {
    height: 30px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px;
  }
  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

const MessageBox = styled.div<{ position: string }>`
  position: absolute;
  ${(props) => (props.position === "left" ? "right: -110px;" : "left: -110px;")}
  top:25px;
  border: 1px solid #ccc;
  width: 100px;
  height: 100px;
`;

interface User extends SocketType {
  user: LoginUser;
  position: string;
}

const UserBoxContents = ({ user, position, socket }: User) => {
  const [messages, receiveMsg] = useMessage();
  useEffect(() => {
    socket.on("chatting", (data) => {
      if (data.user !== (user && user.nickName)) return;
      receiveMsg(data.value);
    });
  }, [user.nickName]);

  return (
    <UserSit>
      <img src={user ? "data:image/jpeg;base64," + user.img : ""} alt="" />
      <p>{user ? user.nickName + " " + user.name : "빈 자리"}</p>
      {messages[0] && user.name && (
        <MessageBox position={position}>
          {messages.map((msg, key) => (
            <p key={key}>{msg}</p>
          ))}
        </MessageBox>
      )}
    </UserSit>
  );
};

export const UserBox = React.memo(UserBoxContents);

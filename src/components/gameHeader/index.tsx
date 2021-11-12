import React from "react";

import styled from "styled-components";

import { useRouter } from "next/router";

const Header = styled.header`
  padding: 25px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  h2 {
    margin: 0;
    font-size: 1rem;
  }
`;

const GameHeaderContents = () => {
  const router = useRouter();

  return (
    <Header>
      <h2>캐치마인드</h2>
      <button onClick={() => router.push("/login")}>나가기</button>
    </Header>
  );
};

export const GameHeader = React.memo(GameHeaderContents);

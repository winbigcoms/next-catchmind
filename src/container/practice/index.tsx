import styled from "styled-components";
import { PracticeCanvasLayer } from "src/components";
import Link from "next/link";

const StyledDiv = styled.div`
  width: 700px;
  margin: auto;
  position: relative;

  a {
    display: inline-block;
    margin-top: 10px;
  }
`;

export const PracticeContainer = () => {
  return (
    <StyledDiv>
      <PracticeCanvasLayer width={700} height={700} />
      <Link href="/">로그인 화면으로</Link>
    </StyledDiv>
  );
};

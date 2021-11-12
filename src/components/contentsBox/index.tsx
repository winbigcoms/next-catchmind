import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
`;

export const ContentsBox = ({ children, color }) => {
  return <StyledDiv color={color}>{children}</StyledDiv>;
};

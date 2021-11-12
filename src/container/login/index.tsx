import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserRequest } from "store/modules/user";
import styled, { keyframes } from "styled-components";
import { theme } from "../../../const";
import { ContentsBox, FallingSnow } from "../../components";
import { API } from "../../service/index";

const BoxShow = keyframes`
  0%{
    opacity:0;
  } 
  100%{
    opacity:1;
  }
`;

const ThemeBox = styled.div`
  position: absolute;
  z-index: 50;
  bottom: 80px;
  left: 20px;
  border: 1px solid pink;
  background-color: #fff;
  padding: 15px 10px;
  opacity: 0;
  box-sizing: border-box;
  width: 150px;
  animation: ${BoxShow} 1s 1 both;
  & > div {
    display: flex;
    flex-wrap: wrap;
    p {
      margin: 0;
      width: 100%;
    }
  }
`;

const ExampleBox = styled.div<{ bg: string; fl: string }>`
  position: relative;
  width: 50px;
  height: 50px;
  background: ${(props) => props.bg};
  margin: 5px;
  span {
    position: absolute;
    width: 50px;
    height: 50px;
    text-align: center;
    padding-top: 17px;
    display: inline-block;
    font-size: 16px;
    color: ${(props) => props.fl};
    cursor: pointer;
    user-select: none;
  }
`;

const SetThemeBtn = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: #fff;
  color: #000;
  width: 50px;
  height: 50px;
  border: 0;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const LoginFormBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 50%;
  background-color: #fff;
  position: relative;
  z-index: 10;

  & > * {
    margin: 15px;
  }

  & button {
    margin: 0 10px;
  }
`;

export const LoginContainer = () => {
  const [id, setId] = useState("");
  const [showColorSelectMenu, setShowColorSelectMenu] = useState(false);
  const [bgTheme, setBgTheme] = useState({
    bg: "black",
    fl: "#fff",
  });

  const dispatch = useDispatch();

  const router = useRouter();

  const changeTheme = (idx: number) => {
    setBgTheme(() => theme[idx]);
  };

  const changeShowThemeBox = () => {
    setShowColorSelectMenu((state) => !state);
  };

  const changeIdInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setId(() => e.target.value);
  };

  const playGame = async () => {
    dispatch(getUserRequest(id));
  };

  const goSignUp = () => {
    router.push("/signUp");
  };

  return (
    <ContentsBox color={bgTheme.bg}>
      <LoginFormBox>
        <h2>
          <span>캐치</span>마인드
        </h2>
        <label>
          로그인
          <input
            type="text"
            value={id}
            onChange={changeIdInput}
            placeholder="아이디는 이름입니다~"
          />
        </label>
        <div>
          <button onClick={playGame}>로그인버튼</button>
          <button onClick={goSignUp}>회원 가입</button>
        </div>
      </LoginFormBox>
      {showColorSelectMenu && (
        <ThemeBox>
          <div>
            {theme.map((colors, idx) => (
              <ExampleBox key={idx} bg={colors.bg} fl={colors.fl}>
                <span onClick={() => changeTheme(idx)}>*</span>
              </ExampleBox>
            ))}
          </div>
        </ThemeBox>
      )}
      <SetThemeBtn onClick={changeShowThemeBox}>테마 변경</SetThemeBtn>
      <FallingSnow color={bgTheme.fl} />
    </ContentsBox>
  );
};

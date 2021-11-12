import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalConatiner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

const ModalBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    color: #fff;
    text-align: center;
  }
  img {
    width: 100%;
  }
`;

interface AnswerPopupProps {
  name: string;
  open: boolean;
}

const Correct = (props: AnswerPopupProps): JSX.Element => {
  const { name, open } = props;

  return open ? (
    <ModalConatiner className="pyro">
      <div className="before"></div>
      <div className="after"></div>
      <ModalBox>
        <p>
          {name}
          <br />
          골---든 정답입니다!
        </p>
        <img src="./img/12.png" alt="" />
      </ModalBox>
    </ModalConatiner>
  ) : null;
};

export const CorrectModal = ({
  name,
  open,
}: {
  name: string;
  open: boolean;
}) => {
  return ReactDOM.createPortal(
    <Correct name={name} open={open} />,
    document.getElementById("modal") as HTMLElement
  );
};

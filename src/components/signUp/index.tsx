import styled from "styled-components";

export const SignUpConatiner = styled.div`
  box-sizing: border-box;
  width: 650px;
  margin: auto;
  display: flex;
  position: relative;
  z-index: 2;
  flex-direction: column;
  padding: 30px 20px 15px;
  background-color: #fff;
  align-items: center;
`;

export const SignUpButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 70%;
  button {
    cursor: pointer;
    width: 150px;
    height: 50px;
    background-color: skyblue;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 15px;
  }

  button:disabled {
    background-color: red;
    cursor: not-allowed;
  }
`;

export const SignUpForm = styled.div`
  padding-top: 20px;
  width: 85%;
  display: flex;
  justify-content: space-between;

  figure {
    margin: 0;
    padding-top: 20px;
    border: 1px solid #000;
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    span {
      padding: 100px 0 20px;
    }

    figcaption {
      padding-bottom: 10px;
      width: 195px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  & > label > input {
    width: 1px;
    height: 1px;
  }
`;

export const SignUpInputBox = styled.div`
  label {
    display: block;
    padding-bottom: 30px;

    span {
      display: inline-block;
      width: 50px;
    }
  }
`;

export const DuplicateNoticText = styled.p`
  padding-top: 10px;
  text-align: center;
`;

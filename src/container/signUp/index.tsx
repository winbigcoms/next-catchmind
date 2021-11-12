import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import {
  SignUpButtonBox,
  SignUpConatiner,
  SignUpForm,
  SignUpInputBox,
  DuplicateNoticText,
} from "src/components/signUp";
import { API } from "src/service";
import { Button } from "@mui/material";
import axios from "axios";

interface teamsTitles {
  teams: [string];
  titles: [string];
}
interface inputs {
  name: string;
  age: number;
}
interface selecteds {
  team: string;
  title: string;
}

const SignUp = () => {
  const [img, setImage] = useState<File>();
  const [preview, setPreview] = useState("");
  const [inputs, setInputs] = useState({ name: "", nickName: "" });
  const [isNicknameReduplicate, setNicknameReduplicateState] = useState({
    isInit: true,
    result: true,
  });

  const router = useRouter();

  const makeBase64 = (image: File): Promise<typeof image> => {
    return new Promise(() => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function (event) {
        const target = event.target as FileReader;
        setPreview(() => target.result as string);
        return target.result;
      };
    });
  };

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    if (!files[0]) return;
    setImage(() => files[0]);
    makeBase64(files[0]).then((res) => console.log(res));
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [id]: value }));
  };

  const goLoginPage = () => {
    router.push("/login");
  };

  const singUpClick = async () => {
    const sendData = new FormData();

    sendData.append("name", inputs.name);
    sendData.append("nickName", inputs.nickName);
    sendData.append("image", img);

    try {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const signUpResponse = await API.post(
        "http://localhost:8000/api/signUp",
        sendData,
        config
      );
      if (signUpResponse) goLoginPage();
    } catch (e) {
      console.log(e);
    }
  };

  const checkNickNameDub = async () => {
    if (!inputs.nickName) {
      return;
    }

    const isDup2 = await API.get(
      "http://localhost:8000/api/checkNickName",
      `nickName=${inputs.nickName}`
    );

    setNicknameReduplicateState({
      isInit: false,
      result: isDup2,
    });
  };

  return (
    <div style={{ height: "100vh", background: "black", paddingTop: "100px" }}>
      <SignUpConatiner>
        <h2>회원가입</h2>
        <SignUpForm>
          <label>
            <figure>
              {preview ? (
                <img
                  src={preview}
                  alt="사용자프로필사진"
                  width={200}
                  height={225}
                />
              ) : (
                <span>클릭 해서 이미지를 업로드 해주세요</span>
              )}
              <figcaption>
                {preview ? img.name : "프로필 사진을 업로드해주세요"}
              </figcaption>
            </figure>
            <input type="file" accept="image/*" onChange={uploadImg} />
          </label>
          <SignUpInputBox>
            <label>
              <span>이름:</span>
              <input type="text" id="name" onChange={changeValue} />
            </label>
            <label>
              <span>닉네임:</span>
              <input type="text" id="nickName" onChange={changeValue} />
            </label>

            <Button
              style={{ margin: "auto", display: "block" }}
              variant="contained"
              onClick={checkNickNameDub}
            >
              닉네임 중복체크
            </Button>

            {!isNicknameReduplicate.isInit && isNicknameReduplicate.result ? (
              <DuplicateNoticText>
                이미 존재하는 닉네임입니다.`0`
              </DuplicateNoticText>
            ) : !isNicknameReduplicate.isInit &&
              !isNicknameReduplicate.result ? (
              <DuplicateNoticText>
                사용가능한 닉네임입니다 ^0^
              </DuplicateNoticText>
            ) : (
              <></>
            )}
          </SignUpInputBox>
        </SignUpForm>
        <SignUpButtonBox>
          <button
            onClick={singUpClick}
            disabled={isNicknameReduplicate.result || inputs.name === ""}
          >
            회원가입!
          </button>
          <button onClick={goLoginPage}>뒤로 가기</button>
        </SignUpButtonBox>
      </SignUpConatiner>
    </div>
  );
};

export default SignUp;

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
    router.push("/");
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
        <h2>????????????</h2>
        <SignUpForm>
          <label>
            <figure>
              {preview ? (
                <img
                  src={preview}
                  alt="????????????????????????"
                  width={200}
                  height={225}
                />
              ) : (
                <span>?????? ?????? ???????????? ????????? ????????????</span>
              )}
              <figcaption>
                {preview ? img.name : "????????? ????????? ?????????????????????"}
              </figcaption>
            </figure>
            <input type="file" accept="image/*" onChange={uploadImg} />
          </label>
          <SignUpInputBox>
            <label>
              <span>??????:</span>
              <input type="text" id="name" onChange={changeValue} />
            </label>
            <label>
              <span>?????????:</span>
              <input type="text" id="nickName" onChange={changeValue} />
            </label>

            <Button
              style={{ margin: "auto", display: "block" }}
              variant="contained"
              onClick={checkNickNameDub}
            >
              ????????? ????????????
            </Button>

            {!isNicknameReduplicate.isInit && isNicknameReduplicate.result ? (
              <DuplicateNoticText>
                ?????? ???????????? ??????????????????.`0`
              </DuplicateNoticText>
            ) : !isNicknameReduplicate.isInit &&
              !isNicknameReduplicate.result ? (
              <DuplicateNoticText>
                ??????????????? ?????????????????? ^0^
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
            ????????????!
          </button>
          <button onClick={goLoginPage}>?????? ??????</button>
        </SignUpButtonBox>
      </SignUpConatiner>
    </div>
  );
};

export default SignUp;

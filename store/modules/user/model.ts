export interface LoginUser {
  name: string;
  nickName: string;
  img: string;
}

export interface UserState extends LoginUser {
  loading: boolean;
}

export interface LoginResponse {
  imgFile: string;
  name: string;
  nickName: string;
}

import { IUser } from "./iUser";

export interface IToken {
  token: string;
  user: IUser;
}
export interface LoginCred {
  email: string;
  password: string;
}

export interface CheckAuth {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
}

//interface for token
export interface IToken {
  _id: string;
  email: string;
  role: TokenRole;
}

export interface IVerifyToken {
  token: string;
  userId: any;
}

export type TokenRole = "patient" | "doctor" | "hospitalAdmin" | "superAdmin";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Auth {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  access_token: {
    token: string;
    exp: number;
  };
  refresh_token: {
    token: string;
    exp: number;
  };
}

export interface AuthState {
  status: "idle" | "loading" | "error";
  auth?: Auth;
}

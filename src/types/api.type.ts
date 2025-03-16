export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  access_token: string;
  user: {
    _id: string;
    currentWorkspace: string;
  };
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

// USER TYPE
export type UserType = {
  _id: string;
  name: string;
  email: string;
};

export type CurrentUserResponseType = {
  user: UserType;
};
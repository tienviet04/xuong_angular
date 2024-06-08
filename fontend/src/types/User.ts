export type User = {
  _id: string;
  email: string;
  role: string;
  username: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type UserLoginRes = {
  token: string;
  user: {
    _id: string;
    email: string;
    role: string;
    username: string;
  };
};

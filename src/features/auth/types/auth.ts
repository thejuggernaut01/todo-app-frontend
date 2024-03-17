export type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type UpdatePasswordProps = {
  password: string;
};

export type ForgotPasswordProps = {
  email: string;
};

export type ApiResponse = {
  status: string;
  message: string;
  error?: {
    [key: string]: string[];
  };
  response: {
    [key: string]: {
      [x: string]: string;
    };
  };
};

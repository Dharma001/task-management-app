export interface ApiResponse {
  status: string;
  statusCode: number;
  message: string;
  errors?: { [key: string]: string[] };
}

export interface LoginResponse extends ApiResponse {
  data: {
    token: string;
  };
}

export interface RegisterResponse extends ApiResponse {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export interface OtpResponse extends ApiResponse {
  data: {
    verified: boolean;
  };
}

export interface PasswordResponse extends ApiResponse {
  data: {
    success: boolean;
  };
}

export interface VerifyUserEmailResponse extends ApiResponse {
  data: {
    exists: boolean;
  };
}

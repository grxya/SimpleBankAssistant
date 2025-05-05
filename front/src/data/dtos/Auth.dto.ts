export interface AuthDTO {
  fullname: string;
  email: string;
  password: string;
}

export interface RefreshDTO {
  userId: string;
  refreshToken: string;
}

export interface OtpSendDTO {
  email: string;
}

export interface OtpVerifyDTO {
  email: string;
  code: string;
}

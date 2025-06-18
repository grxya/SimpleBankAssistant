export interface AuthDTO {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface OtpSendDTO {
  email: string;
}

export interface OtpVerifyDTO {
  email: string;
  code: string;
}

export interface ResetPasswordDTO {
  email: string;
  code: string;
  newPassword: string;
}
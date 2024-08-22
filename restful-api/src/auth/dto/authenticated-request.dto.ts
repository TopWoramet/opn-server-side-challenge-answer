export interface AuthenticatedRequestDto extends Request {
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  email: string;
  id: string;
}

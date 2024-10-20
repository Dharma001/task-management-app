export interface AuthUserResponse {
  id: number;
  name: string;
  email: string;
  image: string | null;
  token: string;
}

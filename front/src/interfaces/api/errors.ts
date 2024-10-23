export interface ServerError {
  status: string; 
  statusCode: number; 
  message: string;
  errors?: { [key: string]: string[] };
}
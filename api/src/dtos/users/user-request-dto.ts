export interface UserRequestDTO {
  name: string;                   
  email: string;                  
  password?: string;             
  image?: string;                 
  phone?: string;                
  is_admin?: number;               
  status?: number;               
  email_verified_at?: Date | null; 
  remember_token?: string | null; 
}

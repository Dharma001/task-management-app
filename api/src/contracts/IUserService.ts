import { UserRequestDTO } from '../dtos/users/user-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';

export interface IUserService {
    getAllUsers(): Promise<UserResponseDTO[]>;
    getUserById(id: number): Promise<UserResponseDTO | null>;
    createUser(userData: UserRequestDTO): Promise<UserResponseDTO>;
    getUserByEmail(email: string): Promise<UserResponseDTO | null> ;
}

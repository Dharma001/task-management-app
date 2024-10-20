import { IUserService } from '../../contracts/IUserService';
import { UserRequestDTO } from '../../dtos/users/user-request-dto';
import { UserResponseDTO } from '../../dtos/users/user-response-dto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient();

export class UserService implements IUserService {
    async getAllUsers(): Promise<UserResponseDTO[]> {
        try {
            const users = await prisma.user.findMany({
                where: {
                    status: 1,
                },
                orderBy: {
                    created_at: 'desc',
                },
                take: 10,
                skip: 0,
            });
            return users.map(user => new UserResponseDTO(user));
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Unable to fetch users. Please try again later.');
        }
    }

    async getUserById(id: number): Promise<UserResponseDTO | null> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return user ? new UserResponseDTO(user) : null;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw new Error('Unable to fetch user. Please try again later.');
        }
    }

    async createUser(userData: UserRequestDTO): Promise<UserResponseDTO> {
        try {
            const newUserData: any = {
                name: userData.name,
                email: userData.email,
                image: userData.image || undefined,
                phone: userData.phone || undefined,
                is_admin: userData.is_admin ?? 0,
                status: userData.status ?? 1,
            };
    
            if (userData.password) {
                const salt = await bcrypt.genSalt(10);
                newUserData.password = await bcrypt.hash(userData.password, salt);
            }
    
            const newUser = await prisma.user.create({
                data: newUserData,
            });
    
            return new UserResponseDTO(newUser);
        } catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Unable to create user. Please try again later.');
        }
    }    

    async getUserByEmail(email: string): Promise<UserResponseDTO | null> {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            return user ? new UserResponseDTO(user) : null;
        } catch (error) {
            console.error(`Error fetching user by email ${email}:`, error);
            throw new Error('Unable to fetch user by email. Please try again later.');
        }
    }
}

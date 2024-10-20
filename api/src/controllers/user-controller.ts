import { Request, Response } from 'express';
import { IUserService } from '../contracts/IUserService';
import { UserRequestDTO } from '../dtos/users/user-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';
import { ResponseHelper } from '../../helpers/response-helper';
import { validateUser } from '../validations/user-validation';
import { container } from '../providers/container';

export class UserController {
    private userService: IUserService;

    constructor() {
        this.userService = container.get<IUserService>('IUserService'); 
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: UserResponseDTO[] = await this.userService.getAllUsers();
            res.status(200).json(ResponseHelper.success(users, 'Users fetched successfully'));
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json(ResponseHelper.error('Unable to fetch users. Please try again later.'));
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const userId: number = parseInt(req.params.id);

        try {
            const user: UserResponseDTO | null = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json(ResponseHelper.error('User not found.', 404));
                return;
            }
            res.status(200).json(ResponseHelper.success(user, 'User fetched successfully'));
        } catch (error) {
            console.error(`Error in getUserById with ID ${userId}:`, error);
            res.status(500).json(ResponseHelper.error('Unable to fetch user. Please try again later.'));
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const userData: UserRequestDTO = req.body;
    
        const validation = await validateUser(userData, this.userService);
    
        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }
    
        try {
            const newUser: UserResponseDTO = await this.userService.createUser(userData);
            res.status(201).json(ResponseHelper.success(newUser, 'User created successfully'));
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).json(ResponseHelper.error('Unable to create user. Please try again later.'));
        }
    }
}

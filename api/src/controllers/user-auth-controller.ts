import { Request, Response } from 'express';
import { IUserAuthService } from '../contracts/IUserAuthService';
import { IUserService } from '../contracts/IUserService';
import { UserRegisterRequestDTO } from '../dtos/users/auth/register-request-dto';
import { UserLoginRequestDTO } from '../dtos/users/auth/login-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';
import { ResponseHelper } from '../../helpers/response-helper';
import { validateUserRegistration } from '../validations/Auth/register-validation';
import { validateUserLogin } from '../validations/Auth/login-validation';
import { container } from '../providers/container';
import { UserOtpRequestDTO } from '../dtos/users/auth/otp-request-dto';
import { validateUserOtp } from '../validations/Auth/otp-validation';
import { UserPasswordRequestDTO } from '../dtos/users/auth/user-password-dto';
import { validateUserPassword } from '../validations/User/user-password-validation';
import { VerifyUserEmail } from '../dtos/users/auth/auth-verify-email';
import { validateUserEmail } from '../validations/Auth/verify-email-validation';

export class UserAuthController {
    private userAuthService: IUserAuthService;
    private userService: IUserService;

    constructor() {
        this.userAuthService = container.get<IUserAuthService>('IUserAuthService');
        this.userService = container.get<IUserService>('IUserService');
    }

    async register(req: Request, res: Response): Promise<void> {
        const userData: UserRegisterRequestDTO = req.body;

        const validation = await validateUserRegistration(userData, this.userService);
        
        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }

        try {
            const newUser: UserResponseDTO = await this.userAuthService.register(userData);
            res.status(201).json(ResponseHelper.success(newUser, 'User registered successfully'));
        } catch (error) {
            console.error('Error in register:', error);
            res.status(500).json(ResponseHelper.error('Unable to register user. Please try again later.'));
        }
    }

    async verifyUserExists(req: Request , res: Response): Promise<void> {
        const email: VerifyUserEmail = req.body;

        const validation = await validateUserEmail(email, this.userService);

        if(!validation.valid){
            const validationErrors = validation.errors ?? {}
            res.status(400).json(ResponseHelper.validationError(validationErrors))
            return;
        }else [
            res.status(201).json(ResponseHelper.success(email, 'user account found successfuly.'))
        ]
    }

    async verifyOtp(req: Request, res: Response): Promise<void> {
        const otpData: UserOtpRequestDTO = req.body;    
        const validation = await validateUserOtp(otpData, this.userService);
    
        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }
    
        try {
            const otp: string = await this.userAuthService.verifyOtp(otpData);
            res.status(200).json(ResponseHelper.success({ otp }, 'Verified successfully'));
        } catch (error) {
            console.error('Error while verifying otp:', error);
            res.status(401).json(ResponseHelper.error('Invalid email or OTP'));
        }
    }

    async updatePassword(req: Request, res: Response): Promise<void> {
        const userData: UserPasswordRequestDTO = req.body
        const validation = await validateUserPassword(userData, this.userService)

        if(!validation.valid){
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors))
        }

        try {
            const passwordData: string = await this.userAuthService.updatePassword(userData);
            res.status(200).json(ResponseHelper.success({passwordData}, 'Password created successfully!'))
        }catch(error){
            console.log(`Error while creating a password: ${error}`)
            res.status(400).json(ResponseHelper.error('Opps! Something went wrong '))
        }
    }
    
    async login(req: Request, res: Response): Promise<void> {
        const loginData: UserLoginRequestDTO = req.body;

        const validation = await validateUserLogin(loginData);

        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }

        try {
            const token: string | null = await this.userAuthService.login(loginData);

            if (token) {
                res.status(200).json(ResponseHelper.success({ token }, 'Login successful'));
            } else {
                res.status(400).json(ResponseHelper.error('Invalid login credentials.'));
            }
        } catch (error) {
            console.error('Error in login:', error);
            res.status(401).json(ResponseHelper.error('Invalid email or password.'));
        }
    }

    async googleCallback(req: Request, res: Response): Promise<void> {
        if (req.user) {
            const { user } = req;
    
            try {
                res.send(`
                    <script>
                        const user = ${JSON.stringify(user)};
                        window.opener.postMessage({ user }, '*');
                        window.close();
                    </script>
                `);
            } catch (error) {
                console.error('Error during Google callback:', error);
                res.status(500).json(ResponseHelper.error('Internal server error'));
            }
        } else {
            console.error('User not authenticated');
            res.status(401).json(ResponseHelper.error('User not authenticated'));
        }
    }    
}

import { IUserAuthService } from '../contracts/IUserAuthService';
import { IUserService } from '../contracts/IUserService';
import { UserAuthService } from '../services/users/user-auth-service';
import { UserService } from '../services/users/user-service';

type Constructor<T> = { new (...args: any[]): T };

class Container {
    private services = new Map<string, any>();
    
    constructor() {
        this.registerServices();
    }

    private registerServices() {
        this.services.set('IUserAuthService', new UserAuthService());
        this.services.set('IUserService', new UserService());
    }

    public register<T>(key: string, service: Constructor<T>): void {
        this.services.set(key, new service());
    }

    public get<T>(key: string): T {
        const service = this.services.get(key);
        if (!service) {
            throw new Error(`Service ${key} not found`);
        }
        return service;
    }
}

export const container = new Container();

import { AuthService } from './auth.service';
import { Request as RequestInterface } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(req: RequestInterface): Promise<import("../user/entities/user.entity").User>;
}

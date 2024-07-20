export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isTwoFactorEnabled: boolean;
    twoFactorSecret: string;
    profileImage: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    createdAt: Date;
    updatedAt: Date;
}

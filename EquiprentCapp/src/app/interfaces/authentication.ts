export class SignInModel {
    Login: string;
    Password: string;
}

export class AuthUserModel {
    Login: string;
    Roles: Array<string>;
    FirstName: string;
    LastName: string;
}

export interface ResetPasswordModel {
    Email: string;
    Language: string;
}

export interface ChangePasswordModel {
    Token: string;
    Password: string;
}
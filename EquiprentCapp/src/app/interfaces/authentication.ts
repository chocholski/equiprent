export class AuthUserModel {
    FirstName: string;
    LastName: string;
    Login: string;
    Roles: Array<string>;
}

export interface ChangePasswordModel {
    Password: string;
    Token: string;
}

export interface ResetPasswordModel {
    Email: string;
    Language: string;
}

export class SignInModel {
    Login: string;
    Password: string;
}
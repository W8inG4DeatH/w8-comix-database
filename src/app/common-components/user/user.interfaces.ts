export interface IUser
{
    login: string;
    name?: string;
    password: string;
    avatarBase64?: string;
    isLogged?: boolean;
}

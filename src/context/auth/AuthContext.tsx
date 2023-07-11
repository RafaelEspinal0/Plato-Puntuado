import { IUser } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps{
    isLoggedIn: boolean;
    user?: IUser;
    
    loginUser: (username: string, password: string) => Promise<boolean>
    registerUser: (name: string, username: string, password: string) => Promise<{
        hasError: boolean;
        message?: string;
    }>
}


export const AuthContext = createContext({} as ContextProps)
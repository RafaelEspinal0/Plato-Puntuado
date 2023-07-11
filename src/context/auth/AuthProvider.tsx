import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { platoApi } from '@/api';
import Cookies from 'js-cookie'
import axios from 'axios';

export interface AuthState {
    isLoggedIn: boolean;   
    user?: IUser
}

interface Props{
    children: any
}

const Auth_INITIAL_STATE : AuthState = {
   isLoggedIn: false,
   user: undefined
}

export const AuthProvider: FC<Props> = ({children}) => {

   const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)

    useEffect(() => {
      checkToken();
    
    }, [])
    
    const checkToken = async() => {
        try{
            const {data} = await platoApi.get('user/validate-token')
            const {token, user } = data
            Cookies.set('token', token);
            dispatch({type: '[Auth] - Login', payload: user})
        }catch(error){
            Cookies.remove('token')
        }
    }


    const loginUser = async (username: string, password:string): Promise<boolean> => {

        try{
            const {data} = await platoApi.post('user/login', {username, password})
            const {token, user } = data
            Cookies.set('token', token);
            dispatch({type: '[Auth] - Login', payload: user})
            return true
        }catch(error){
            return false;
        }
    } 

    const registerUser = async (name: string, username: string, password: string): Promise<{hasError:boolean; message?:string}> => {
        try {
            const { data } = await platoApi.post('user/register', {name, username, password})
            const {token, user } = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login', payload: user});
            return {
                hasError:false
            }

        } catch (error) {
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Unable to create user, please try again later.'
            }
        }
    }
    
   return(
       <AuthContext.Provider value={{
           ...state,

           loginUser, 
           registerUser
       }} >
           {children}
       </AuthContext.Provider>
   )
};

export interface IUser{

    name:  string,
    username: string,
    password: string,
    role: IRole
   
    //TODO: agregar createdAt y updatedAt
}

export type IRole = 'Admin' | 'Client' | 'Restaurant';
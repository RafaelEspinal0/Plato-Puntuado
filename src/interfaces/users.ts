
export interface IUser{

    _id: string | null;
    name:  string,
    username: string,
    password?: string,
    role: IRole

    //TODO: agregar createdAt y updatedAt
    createdAt?: string;
    updatedAt?: string;
}

export type IRole = 'Admin' | 'Client' | 'Restaurant';
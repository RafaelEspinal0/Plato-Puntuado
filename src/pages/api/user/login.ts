import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/db';
import { db } from '@/database';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

type Data = 
| {message: string}
| {
    token: string;
    user: {
        username: string;
        name: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'POST':
            return loginUser(req, res);

        default:
            res.status(400).json({
                message: 'Bad request'
            })

    }


}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        username = '',
        password = ''
    } = req.body

    await db.connect();
    const user = await User.findOne({username});
    await db.disconnect();

    if(!user){
        return res.status(400).json({message: 'Username or password is incorrect.'})
    }
    
    if(!bcrypt.compareSync(password, user.password!)){
        return res.status(400).json({message: 'Username or password is incorrect.'})
    }
    
    const {role, name } = user;

    return res.status(200).json({
        token: '',
        user: {
            username, role, name
        }
    })

}

import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/db';
import { db } from '@/database';
import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

type Data = 
| {message: string}
| {
    token: string;
    user: {
        username: string;
        name: string;
        role: string;
        _id: string | null;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'POST':
            return registerUser(req, res);

        default:
            res.status(400).json({
                message: 'Bad request'
            })

    }


}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        name = '',
        username = '',
        password = ''
    } = req.body as { name: string, username:string, password: string}

    if( password.length < 6 ) {
        return res.status(400).json({
            message: 'Password must contain at least 6 characters'
        })
    }
    
    await db.connect();
    const user = await User.findOne({username});

    if (user){
        return res.status(400).json({
            message: 'Username already exist.'
        });
    }
    
    const newUser = new User({
        username: username.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'Client',
        name
    })

    try {
        await newUser.save({validateBeforeSave: true});
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Review logs on server'
        })
    }
    

    
    const {_id, role} = newUser;

    const token = jwt.signToken(_id, username);

    
    return res.status(200).json({
        token,
        user: {
            _id,
            username, 
            name,
            role 
            
        }
    })

}

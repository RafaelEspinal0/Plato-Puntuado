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
        case 'GET':
            return checkJWT(req, res);

        default:
            res.status(400).json({
                message: 'Bad request'
            })

    }


}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        token =''
    } = req.cookies

    let userId = '';

    try {
        userId = await jwt.isValidToken(token);
    } catch (error) {

        return res.status(401).json({
            message: 'Auth token is not valid.'
        })

    }

    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect();

    if(!user){
        return res.status(400).json({message: 'User {id} not exist.'})
    }

    

    const { _id, username, role, name } = user;

    
    return res.status(200).json({
        token: jwt.signToken(_id, username),
        user: {
            username, role, name, _id
        }
    })

}

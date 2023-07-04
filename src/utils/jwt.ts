import jwt from 'jsonwebtoken'

export const signToken = ( _id: string|null, username: string) => {
    
    if (!process.env.JWT_SECRET_SEED){
        throw new Error ('No Seed of JWT - Review .env')
    }

    return jwt.sign(
        //payload
        {_id, username},

        //seed
        process.env.JWT_SECRET_SEED,

        //config
        {expiresIn: '2h'}
    )

}
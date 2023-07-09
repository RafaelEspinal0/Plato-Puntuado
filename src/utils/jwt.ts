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


export const isValidToken = ( token: string ): Promise<string> => {

    if (!process.env.JWT_SECRET_SEED){
        throw new Error ('No Seed of JWT - Review .env')
    }


    return new Promise( (resolve, reject) =>{

        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {

                if (err) return reject('JWT is not valid.');
                
                const { _id } = payload as {_id: string};

                resolve(_id)

            })
        } catch (error) {

            reject('JWT is not valid.')
            
        }

    });

}
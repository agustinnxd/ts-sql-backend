import jwt from 'jsonwebtoken'

const generarJWT = ( password = '' ) => {

    return new Promise((resolve, reject) => {
        
        const payload = { password };

        jwt.sign( payload, "Stack", {
            expiresIn: '8h'
        }, (err: any, token) => {
            if (err){
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            };
        });


    });


};

export default generarJWT


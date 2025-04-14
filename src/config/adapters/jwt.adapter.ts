import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "../envs";

export const jwtAdapter = {

  generateToken: ( payload: any, duration: string = '1d' ) => {

    return new Promise (( resolve, reject ) => {
      jwt.sign( payload, envs.JWT_SEED, { expiresIn: duration } as SignOptions, ( err, token) => {
        if( err ) return reject(null)
        return resolve(token)
      })
    })
  },

  validatedToken: <T>( token: string ): Promise< T | null> => {
    return new Promise (( resolve, reject ) => {
      jwt.verify( token, envs.JWT_SEED, (err, decoded) => {
        if( err ) return reject(null);
        resolve(decoded as T);
      })
    })
  }

}
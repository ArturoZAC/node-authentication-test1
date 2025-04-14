import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";

export const AuthMiddleware = {

  validateJWT: async ( req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if ( !authorization ) return res.status(404).json({ error: 'Token not found' });
    if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer Token' });

    const token = authorization.split(' ')[1] || '';

    try {
      const payload = await jwtAdapter.validatedToken<{ id: string}>(token);
      if ( !payload ) return res.status(401).json({ error: 'Invalid Token' });

      const user = await prisma.user.findUnique({ where: {
        id: payload.id
      }})
      if( !user )return res.status(404).json({ error: 'User not found' });
      
      const { password, ...rest} = user;
      (req as any).user = rest;

      next();

    } catch (error) {
      return res.status(500).json({error: 'Internal Server Error'});
    }


  }


}
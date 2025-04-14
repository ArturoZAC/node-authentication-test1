import { Request, Response } from "express"
import { CustomError, LoginAuthDto, RegisterAuthDto } from "../../domain"
import { AuthService } from "../services/auth.service"

export class AuthController {

  public constructor(
    public readonly authService: AuthService
  ){}

  private handleError = ( error: unknown, res: Response) => {
    if( error instanceof CustomError ){
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public loginAuth = ( req: Request, res: Response ) => {
    const [ error, loginAuthDto ] = LoginAuthDto.create( req.body );
    if( error ) return res.status(400).json({error})
    
    this.authService.loginUser( loginAuthDto! )
      .then( response => res.status(200).json(response) )
      .catch( error => this.handleError(error, res))
      
  }

  public registerAuth = ( req: Request, res: Response ) => {
    const [ error, registerAuthDto ] = RegisterAuthDto.create( req.body );
    if( error ) return res.status(400).json({error})

    this.authService.registerUser( registerAuthDto! )
      .then( response => res.status(201).json(response) )
      .catch( error => this.handleError(error, res))
  }

  public renewAuth = ( req: Request, res: Response ) => {
    return res.json('Renew Auth')
  }

};
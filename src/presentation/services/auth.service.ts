import { bcryptjsAdapter, jwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { CustomError, LoginAuthDto, RegisterAuthDto } from "../../domain";

export class AuthService {

  public registerUser = async( registerAuthDto: RegisterAuthDto) => {

    const existUser = await prisma.user.findUnique({where: { email: registerAuthDto.email }})
    if( existUser ) throw CustomError.badRequest('Email already exist');

    try {
      const user = await prisma.user.create({
        data: {
          ...registerAuthDto,
          password: bcryptjsAdapter.hash(registerAuthDto.password),
        }
      })
  
      const { password, ...rest } = user;
      //TODO:GENERATE AUTH(USER) ENTITY
      const token = await jwtAdapter.generateToken({ id: user.id });
      if ( !token ) throw CustomError.badRequest('Error while creating JWT');

      console.log(token);
      

      return {
        user: rest,
        token
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }

  }


  public loginUser = async( loginAuthDto: LoginAuthDto ) => {
    const user = await prisma.user.findUnique({where: { email: loginAuthDto.email }});
    if ( !user ) throw CustomError.badRequest('User not exist');

    const isValidPassword = bcryptjsAdapter.compare(loginAuthDto.password, user.password);
    if ( !isValidPassword ) throw CustomError.badRequest('Invalid password');

    try {
      
      //TODO:GENERATE AUTH(USER) ENTITY
      const { password, ...rest } = user;
      const token = await jwtAdapter.generateToken({ id: user.id });
      if ( !token ) throw CustomError.badRequest('Error while creating JWT');

      return {
        user: rest,
        token
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }


  public renew = async( id: string  ) => {
    
    const token = await jwtAdapter.generateToken({id: id});
    if ( !token ) throw CustomError.badRequest('Error while creating JWT');

    return {
      token
    }
  }

};
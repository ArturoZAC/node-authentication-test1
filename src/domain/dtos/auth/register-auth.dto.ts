import { z } from "zod";

export class RegisterAuthDto {

  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ){}

  public static schema = z.object({
    name: z.string({message: "name is required"}).min(1, { message: "Name is required" }),
    email: z.string({message: "email is required"}).email({ message: "Email is invalid" }),
    password: z.string({message: "password is required"}).min(6, { message: "Password must be at least 6 characters long" }),
  })

  public static create = (object: z.infer< typeof this.schema> ): [string?, RegisterAuthDto?] => {

    const result = this.schema.safeParse(object)

    if( !result.success ){
      const customError = result.error.errors[0].message === 'Required'
                            ? "name is required" 
                            : result.error.errors[0].message
      return [ customError, undefined];
    }

    const { name, email, password } = result.data;
    return [undefined, new RegisterAuthDto(name, email, password)];
  }



};
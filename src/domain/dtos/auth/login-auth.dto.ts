import { z } from "zod";

export class LoginAuthDto {

  private constructor(
    public readonly email: string,
    public readonly password: string,
  ){}

  public static schema = z.object({
    email: z
          .string({
            required_error: 'email is required',
            invalid_type_error: 'email must be a string',
          })
          .email({ message: 'email must be a valid email address' })
          .nonempty({ message: 'email is required'}),
    password: z
          .string({
            required_error: 'password is required',
            invalid_type_error: 'password must be a string',
          })
          .min(6, { message: "Password must be at least 6 characters long" }),
  });

  public static create = ( object: z.infer<typeof this.schema>): [string?, LoginAuthDto?] => {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      const customError = result.error.errors[0].message === 'Required'
                            ? "email is required" 
                            : result.error.errors[0].message
      return [ customError, undefined];
    }

    const { email, password } = result.data;
    return [ undefined, new LoginAuthDto(email, password) ];
  }

};
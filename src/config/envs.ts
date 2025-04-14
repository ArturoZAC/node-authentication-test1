import "dotenv/config";
import { z } from "zod";

export const envsSchema = z.object({
  PORT: z.coerce.number({
    required_error: 'PORT is required',
    invalid_type_error: 'PORT must be a number',
  }).min(1, {
    message: 'PORT must be greater than 0',
  }),
  POSTGRES_USER: z.string().nonempty({message: 'POSTGRES_USER is required'}),
  POSTGRES_DB: z.string().nonempty({message: 'POSTGRES_DB is required'}),
  POSTGRES_PASSWORD: z.string().nonempty({message: 'POSTGRES_PASSWORD is required'}),
  POSTGRES_URL: z.string().nonempty({message: 'POSTGRES_URL is required'}),
  JWT_SEED: z.string().nonempty({message: 'JWT_SEED is required'}),
})

export const envs = envsSchema.parse(process.env);
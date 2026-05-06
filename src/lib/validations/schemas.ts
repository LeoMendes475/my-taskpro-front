import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'Mínimo 6 caracteres'),
})

export const passwordSchema = z
  .string({ required_error: 'Senha obrigatória' })
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[0-9]/, 'Deve conter ao menos um número')
  .regex(/[^a-zA-Z0-9]/, 'Deve conter ao menos um caractere especial')

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome obrigatório' })
      .min(2, 'Mínimo 2 caracteres'),
    email: z
      .string({ required_error: 'E-mail obrigatório' })
      .email('E-mail inválido'),
    password: passwordSchema,
    confirmPassword: z.string({ required_error: 'Confirmação obrigatória' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  })

export const taskSchema = z.object({
  title: z
    .string({ required_error: 'Título obrigatório' })
    .min(1, 'Título não pode ser vazio')
    .max(255, 'Máximo 255 caracteres'),
  category: z
    .string({ required_error: 'Categoria obrigatória' })
    .min(1, 'Selecione uma categoria'),
  durationMinutes: z
    .number()
    .min(1, 'Mínimo 1 minuto')
    .max(1440, 'Máximo 24 horas')
    .optional()
    .or(z.literal(undefined)),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type TaskFormData = z.infer<typeof taskSchema>

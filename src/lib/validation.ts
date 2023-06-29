import { z } from 'zod'

export type SignUpSchema = z.infer<typeof signUpSchema>
export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .nonempty('Required')
      .min(6, 'Password should be at least 6 characters'),
    confirmPassword: z.string().nonempty('Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignInSchema = z.infer<typeof signInSchema>
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty('Required'),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export const resetPasswordSchema = z.object({
  email: z.string().email(),
})

export type UpdateProfileScheme = z.infer<typeof updateProfileScheme>
export const updateProfileScheme = z.object({
  displayName: z.string().max(30, 'Max 30 characters'),
})

export type AddNoteScheme = z.infer<typeof addNoteScheme>
export const addNoteScheme = z.object({
  title: z.string().min(3, 'Min 3 characters').max(30, 'Max 30 characters'),
})

'use server'
import { signInFormSchema, signUpFormSchema } from '@/lib/validators'
import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { hashSync } from 'bcrypt-ts-edge'
import { prisma } from '@/lib/prisma'

// Sign in the usere with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    await signIn('credentials', user)
    return { success: true, message: 'Sign in successful' }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: 'Invalid email or password',
      }
    }

    throw error
  }
}

// Sign out the user
export async function signOutUser() {
  try {
    await signOut()
  } catch (error) {
    throw error
  }
}

// Sign up user
export async function singUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    const plainPassword = user.password

    user.password = hashSync(user.password, 10)

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
      redirectTo: '/',
    })

  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: 'User was not registered',
      }
    }

    throw error
  }
}

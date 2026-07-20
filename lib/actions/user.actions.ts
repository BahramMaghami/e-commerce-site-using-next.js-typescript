'use server'

import { signInFormSchema } from '@/lib/validators'
import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'

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

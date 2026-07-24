import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import authConfig from './auth.config'

export const config = {
  // pages: {
  //   signIn: '/sign-in',
  //   error: '/sign-in',
  // },
  ...authConfig,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) {
          return null
        }

        // Find user by email in database using Prisma
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        })

        // Check if user exists and password matches
        if (user && user.password) {
          const isPasswordValid = await compareSync(
            credentials.password as string,
            user.password as string,
          )
          // If password is valid, return user object (without password)
          if (isPasswordValid) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        // If user not found or password is invalid, return null
        return null
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token, user, trigger }: any) {
      // set the user ID from the token to the session object
      session.user.id = token.sub

      session.user.role = token.role
      session.user.name = token.name

      // if there is a update to the user name, update the session object
      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.role = user.role

        // If user has no name then use the email

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]

          // Update database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      // Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID()

        console.log(sessionCartId)
        return true
      } else {
        return true
      }
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

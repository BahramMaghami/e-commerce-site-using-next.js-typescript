import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export default {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },

  providers: [],

  callbacks: {
    authorized({ request, auth }) {
      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()

        // Clone the req headers
        const newRequestHeaders = new Headers(request.headers)

        // Create new response and add the new header
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        })

        // Set newly generated sessioCartId in the response cookies
        response.cookies.set('sessionCartId', sessionCartId)

        return response
      }

      return true
    },
  },
} satisfies NextAuthConfig

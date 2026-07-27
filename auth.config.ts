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
      // Array of regex patterns of paths we want protect
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false

      // Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        // Generate new session cart id cookie
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

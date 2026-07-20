'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValues } from '@/lib/constants'
import Link from 'next/link'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const SignInButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      className="w-full cursor-pointer"
      variant="default"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </Button>
  )
}
const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  })

  return (
    <form action={action}>
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
            required
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="link" target="_self">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm

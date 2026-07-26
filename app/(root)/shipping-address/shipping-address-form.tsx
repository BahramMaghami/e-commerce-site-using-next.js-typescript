'use client'

import { ShippingAddress } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { shippingAddressSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { shippingAddressDefaultValues } from '@/lib/constants'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
    mode: 'onChange',
  })

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: z.infer<typeof shippingAddressSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <div>fullName: {data.fullName}</div>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mt-4">
          Shipping Address
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Please enter an address to ship to
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-col gap-5">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-fullname">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-fullname"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter full name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="streetAddress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-streetAddress">
                    Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-streetAddress"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Address"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-city">City</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-city"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter City"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-postalCode">
                    Postal Code
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-postalCode"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Posta Code"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-country">
                    Country
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-country"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter country"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" disabled={isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}{' '}
            Continue
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default ShippingAddressForm

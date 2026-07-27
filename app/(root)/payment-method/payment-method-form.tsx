'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { paymentMethodSchema } from '@/lib/validators'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Loader, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { updateUserPaymentMethod } from '@/lib/actions/user.actions'

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null
}) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values)

      if (!res.success) {
        toast.error(res.message, {
          className: '!bg-red-500',
        })
        return
      }

      router.push('/place-order')
    })
  }

  return (
    <>
      <Card className="max-w-md mx-auto space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mt-4">
            Payment Method
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please select a payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-5">
              <FieldGroup>
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldSet data-invalid={fieldState.invalid}>
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        className="flex flex-col space-y-5"
                      >
                        {PAYMENT_METHODS?.map((paymentMethod) => (
                          <Field
                            key={paymentMethod}
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <RadioGroupItem
                              value={paymentMethod}
                              id={`form-rhf-radiogroup-${paymentMethod}`}
                              aria-invalid={fieldState.invalid}
                            />
                            <FieldLabel
                              htmlFor={`form-rhf-radiogroup-${paymentMethod}`}
                              className="font-normal"
                            >
                              {paymentMethod}
                            </FieldLabel>
                          </Field>
                        ))}
                      </RadioGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldSet>
                  )}
                />
              </FieldGroup>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
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
    </>
  )
}

export default PaymentMethodForm

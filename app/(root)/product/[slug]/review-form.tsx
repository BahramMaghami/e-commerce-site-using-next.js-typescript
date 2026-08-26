'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { reviewFormDefaultValues } from '@/lib/constants'
import { insertReviewSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { createUpdateReview } from '@/lib/actions/review.action'

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string
  productId: string
  onReviewSubmitted: () => void
}) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof insertReviewSchema>>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  })

  // Open form handler
  const handleOpenForm = () => {
    form.setValue('productId', productId)
    form.setValue('userId', userId)

    setOpen(true)
  }

  // Submit form handler
  const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (
    values,
  ) => {
    const res = await createUpdateReview({ ...values, productId })

    if (!res.success)
      return toast.error(res.message, {
        className: '!bg-red-500',
      })

    setOpen(false)

    onReviewSubmitted()

    toast(res.message)
  }

  return (
    <Dialog open={open} onOpenChangeComplete={setOpen}>
      <Button onClick={handleOpenForm} variant={'default'}>
        Write a Review
      </Button>
      <DialogContent className={'sm:max-w-[425px]'}>
        <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription className={''}>
              Share your thoughts with other customers
            </DialogDescription>
          </DialogHeader>
          <div className="gird gap-4 py4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mt-4">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mt-4">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter description"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="rating"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mt-4">
                    Rating
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SelectItem key={index} value={index + 1}>
                          {index + 1} <StarIcon className="inline h-4 w-4" />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              size={'lg'}
              className={'w-full'}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewForm

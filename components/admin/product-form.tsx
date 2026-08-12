'use client'

import { productDefaultValues } from '@/lib/constants'
import { insertProductsSchema } from '@/lib/validators'
import { Product } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field'
import { Input } from '../ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '../ui/input-group'
import slugify from 'slugify'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createProduct, updateProduct } from '@/lib/actions/product.action'
import { UploadButton } from '@/lib/uploadthing'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: Product
  productId?: string
}) => {
  const router = useRouter()

  type ProductFormInput = z.input<typeof insertProductsSchema>
  type ProductFormOutput = z.output<typeof insertProductsSchema>

  const form = useForm<z.infer<typeof insertProductsSchema>>({
    resolver: zodResolver(insertProductsSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })

  const onSubmit: SubmitHandler<ProductFormInput> = async (values) => {
    // On Create
    if (type === 'Create') {
      const res = await createProduct(values)

      if (!res.success) {
        toast.error(res.message, {
          className: '!bg-red-500',
        })
      } else {
        toast(res.message)
        router.push('/admin/products')
      }
    }
    // On Update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products')
        return
      }

      const res = await updateProduct({ ...values, id: productId })

      if (!res.success) {
        toast(res.message)
      } else {
        toast.error(res.message, {
          className: '!bg-red-500',
        })
        router.push('/admin/products')
      }
    }
  }

  const images = form.watch('images')

  return (
    <form
      id="form-rhf-demo"
      method="POST"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Slug */}
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-slug">Slug</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="form-rhf-demo-slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter slug"
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    className={
                      'bg-gray-500 hover:bg-gray-600 text-white px-4 py-4 mt-2'
                    }
                    onClick={() => {
                      form.setValue(
                        'slug',
                        slugify(form.getValues('name'), { lower: true }),
                      )
                    }}
                  >
                    Generate
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-category">
                  Category
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-category"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter category"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Brand */}
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-brand">Brand</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-brand"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter brand"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-price">Price</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-price"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product price"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Stock */}
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-stock">Stock</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="form-rhf-demo-stock"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the stock"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* Imges */}
          <Controller
            name="images"
            control={form.control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-images">Images</FieldLabel>
                <Card>
                  <CardContent className="space-y-2 mt-2 min-h-48">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="product image"
                          className="w-20 h-20 object-cover rounded-sm"
                          width={100}
                          height={100}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <UploadButton
                  endpoint={'imageUploader'}
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('images', [...images, res[0].url])
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`, {
                      className: '!bg-red-500',
                    })
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="upload-field">{/* isFeatured */}</div>
        <div>
          {/* Description */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-demo-description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product description"
                  autoComplete="off"
                  className="resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div>
          {/* Submit */}
          <Button
            type="submit"
            size={'lg'}
            disabled={form.formState.isSubmitting}
            className={'button col-span-2 w-full'}
          >
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default ProductForm

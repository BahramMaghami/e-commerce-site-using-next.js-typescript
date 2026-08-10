'use client'

import { useState } from 'react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

const DeleteDiolog = ({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<{ success: boolean; message: string }>
}) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id)

      if (!res.success) {
        toast.error(res.message, {
          className: '!bg-red-500',
        })
      } else {
        setOpen(false)
        toast(res.message)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={'cursor-pointer'}
        render={
          <Button size={'sm'} variant={'destructive'}>
            DELETE
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can&apos;t be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={'destructive'}
            size={'sm'}
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDiolog

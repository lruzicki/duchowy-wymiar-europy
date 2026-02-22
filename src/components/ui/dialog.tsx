import * as React from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

type DialogContextValue = {
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

const DialogContext = React.createContext<DialogContextValue>({})

function Dialog({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  return <DialogContext.Provider value={{ onOpenChange, open }}>{children}</DialogContext.Provider>
}

function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { onOpenChange, open } = React.useContext(DialogContext)
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className={cn('relative w-full max-w-3xl rounded-lg border bg-background p-6 shadow-lg', className)}>
        <button
          type='button'
          className='absolute right-4 top-4 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground'
          onClick={() => onOpenChange?.(false)}
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2 text-left', className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn('text-lg font-semibold leading-none', className)} {...props} />
}

export { Dialog, DialogContent, DialogHeader, DialogTitle }

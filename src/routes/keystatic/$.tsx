import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useEffect, useState } from 'react'

const KeystaticAdmin = lazy(async () => {
  const module = await import('@/components/keystatic-admin.client')
  return { default: module.KeystaticAdminClient }
})

export const Route = createFileRoute('/keystatic/$')({
  component: KeystaticSplatPage,
})

function KeystaticSplatPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="p-6 text-sm text-muted-foreground">Loading Keystatic...</div>
  }

  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Keystatic...</div>}>
      <KeystaticAdmin />
    </Suspense>
  )
}

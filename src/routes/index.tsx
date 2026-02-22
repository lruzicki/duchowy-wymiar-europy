import { createFileRoute } from '@tanstack/react-router'

import { FigmaApp } from '@/components/figma/FigmaApp'
import { getLocations } from '@/lib/locations'

export const Route = createFileRoute('/')({
  loader: async () => {
    const locations = await getLocations()
    return { locations }
  },
  component: IndexPage,
})

function IndexPage() {
  const { locations } = Route.useLoaderData()
  return <FigmaApp locations={locations} />
}

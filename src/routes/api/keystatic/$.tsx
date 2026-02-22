import { createFileRoute } from '@tanstack/react-router'

async function handleKeystaticRequest(request: Request) {
  const [{ makeGenericAPIRouteHandler }, { default: keystaticConfig }] = await Promise.all([
    import('@keystatic/core/api/generic'),
    import('../../../../keystatic.config'),
  ])

  const keystaticHandler = makeGenericAPIRouteHandler({
    config: keystaticConfig,
    localBaseDirectory: process.cwd(),
  })

  const response = await keystaticHandler(request)
  return new Response(response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  })
}

export const Route = createFileRoute('/api/keystatic/$')({
  server: {
    handlers: {
      GET: ({ request }) => handleKeystaticRequest(request),
      POST: ({ request }) => handleKeystaticRequest(request),
    },
  },
})

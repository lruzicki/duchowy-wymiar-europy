import { createFileRoute } from '@tanstack/react-router'
import { setResponseHeader } from '@tanstack/react-start/server'

function getCookieName(cookieValue: string) {
  return cookieValue.split('=')[0]?.trim().toLowerCase() ?? ''
}

function orderSetCookies(setCookies: string[]) {
  // Some runtimes incorrectly collapse repeated Set-Cookie headers and keep the last one.
  // Keep access-token cookie last so auth works even in that broken behavior.
  return [...setCookies].sort((a, b) => {
    const aName = getCookieName(a)
    const bName = getCookieName(b)
    if (aName === 'keystatic-gh-access-token') return 1
    if (bName === 'keystatic-gh-access-token') return -1
    return 0
  })
}

function toResponseWithAllCookies(response: {
  body?: BodyInit | null
  headers?: HeadersInit
  status?: number
  statusText?: string
}, request: Request) {
  const headers = new Headers()
  const setCookies: string[] = []

  if (response.headers) {
    if (Array.isArray(response.headers)) {
      for (const [key, value] of response.headers) {
        if (key.toLowerCase() === 'set-cookie') {
          setCookies.push(value)
        } else {
          headers.append(key, value)
        }
      }
    } else if (response.headers instanceof Headers) {
      for (const [key, value] of response.headers.entries()) {
        if (key.toLowerCase() === 'set-cookie') {
          setCookies.push(value)
        } else {
          headers.append(key, value)
        }
      }
    } else {
      for (const [key, value] of Object.entries(response.headers)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            if (key.toLowerCase() === 'set-cookie') {
              setCookies.push(item)
            } else {
              headers.append(key, item)
            }
          }
        } else if (typeof value === 'string') {
          if (key.toLowerCase() === 'set-cookie') {
            setCookies.push(value)
          } else {
            headers.append(key, value)
          }
        }
      }
    }
  }

  const reqUrl = new URL(request.url)
  const isGithubLoginRoute = reqUrl.pathname.endsWith('/api/keystatic/github/login')
  const location = headers.get('location')
  if (isGithubLoginRoute && location?.startsWith('https://github.com/login/oauth/authorize')) {
    const locationUrl = new URL(location)
    if (!locationUrl.searchParams.has('scope')) {
      locationUrl.searchParams.set('scope', 'repo')
      headers.set('location', locationUrl.toString())
    }
  }

  if (setCookies.length) {
    setResponseHeader('set-cookie', orderSetCookies(setCookies))
  }

  return new Response(response.body ?? null, {
    headers,
    status: response.status ?? 200,
    statusText: response.statusText,
  })
}

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
  return toResponseWithAllCookies(response, request)
}

export const Route = createFileRoute('/api/keystatic/')({
  server: {
    handlers: {
      GET: ({ request }) => handleKeystaticRequest(request),
      POST: ({ request }) => handleKeystaticRequest(request),
    },
  },
})

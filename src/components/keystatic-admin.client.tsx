import { Keystatic } from '@keystatic/core/ui'
import keystaticConfig from '../../keystatic.config'

export function KeystaticAdminClient() {
  return <Keystatic config={keystaticConfig} />
}

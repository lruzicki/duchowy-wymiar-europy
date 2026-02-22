import { collection, config, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    locations: collection({
      label: 'Locations',
      path: 'content/locations/*',
      slugField: 'name',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Location Name' } }),
        coordinates: fields.object(
          {
            lat: fields.number({ label: 'Latitude' }),
            lng: fields.number({ label: 'Longitude' }),
          },
          { label: 'Coordinates' }
        ),
        summary: fields.text({ label: 'Summary', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
        coverImage: fields.image({ label: 'Cover Image', directory: 'public/images/locations' }),
      },
    }),
  },
})

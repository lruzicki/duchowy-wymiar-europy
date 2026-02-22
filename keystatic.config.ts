import { collection, config, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.KEYSTATIC_GITHUB_REPO_OWNER ?? 'OWNER',
      name: process.env.KEYSTATIC_GITHUB_REPO_NAME ?? 'REPO',
    },
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
        city: fields.text({ label: 'City' }),
        country: fields.text({ label: 'Country' }),
        date: fields.text({ label: 'Date / Period' }),
        images: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/images/locations',
            publicPath: '/images/locations/',
          }),
          { label: 'Images' }
        ),
      },
    }),
  },
})

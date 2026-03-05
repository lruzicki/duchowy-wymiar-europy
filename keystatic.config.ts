import { collection, config, fields, singleton } from '@keystatic/core'

const localeTextFields = (label: string, multiline = false) =>
  fields.object(
    {
      pl: fields.text({ label: 'Polski', multiline }),
      en: fields.text({ label: 'English', multiline }),
      de: fields.text({ label: 'Deutsch', multiline }),
      uk: fields.text({ label: 'Українська', multiline }),
      ru: fields.text({ label: 'Русский', multiline }),
      ar: fields.text({ label: 'العربية', multiline }),
    },
    { label },
  )

const localeRichTextFields = (label: string) =>
  fields.object(
    {
      pl: fields.document({
        label: 'Polski',
        formatting: true,
        links: true,
        dividers: true,
      }),
      en: fields.document({
        label: 'English',
        formatting: true,
        links: true,
        dividers: true,
      }),
      de: fields.document({
        label: 'Deutsch',
        formatting: true,
        links: true,
        dividers: true,
      }),
      uk: fields.document({
        label: 'Українська',
        formatting: true,
        links: true,
        dividers: true,
      }),
      ru: fields.document({
        label: 'Русский',
        formatting: true,
        links: true,
        dividers: true,
      }),
      ar: fields.document({
        label: 'العربية',
        formatting: true,
        links: true,
        dividers: true,
      }),
    },
    { label },
  )

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.KEYSTATIC_GITHUB_REPO_OWNER ?? 'lruzicki',
      name: process.env.KEYSTATIC_GITHUB_REPO_NAME ?? 'duchowy-wymiar-europy',
    },
  },
  collections: {
    locations: collection({
      label: 'Locations',
      path: 'content/locations/*',
      slugField: 'name',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Slug projektu (np. lugowoje)' } }),
        title: localeTextFields('Nazwa projektu'),
        coordinates: fields.object(
          {
            lat: fields.number({
              label: 'Latitude',
              step: 0.000001,
              validation: { min: -90, max: 90, isRequired: true },
            }),
            lng: fields.number({
              label: 'Longitude',
              step: 0.000001,
              validation: { min: -180, max: 180, isRequired: true },
            }),
          },
          { label: 'Coordinates' },
        ),
        summary: localeTextFields('Krótki opis', true),
        content: fields.markdoc({ label: 'Content' }),
        city: localeTextFields('Miasto'),
        country: localeTextFields('Kraj / region'),
        date: fields.text({ label: 'Data / okres' }),
        images: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/images/locations',
            publicPath: '/images/locations/',
          }),
          { label: 'Images' },
        ),
      },
    }),
  },
  singletons: {
    aktualnosci: singleton({
      label: 'Aktualności',
      path: 'content/aktualnosci',
      format: 'json',
      schema: {
        updatedAt: fields.text({ label: 'Data aktualizacji (np. 2026-03-05)' }),
        title: localeTextFields('Tytuł strony'),
        lead: localeTextFields('Krótki opis', true),
        coverImage: fields.image({
          label: 'Obraz główny',
          directory: 'public/images/aktualnosci',
          publicPath: '/images/aktualnosci/',
        }),
        sections: fields.array(
          fields.object(
            {
              key: fields.text({ label: 'Id sekcji (np. co-juz-zrobilismy)' }),
              title: localeTextFields('Tytuł sekcji'),
              content: localeRichTextFields('Treść sekcji'),
            },
            { label: 'Sekcja' },
          ),
          { label: 'Sekcje' },
        ),
      },
    }),
  },
})

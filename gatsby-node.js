const { google } = require('googleapis')

const LOCATIONS = 'locations'

const jwt = new google.auth.JWT(
  process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  'https://www.googleapis.com/auth/analytics.readonly'
)

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  await jwt.authorize()
  const response = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
    'start-date': '2021-08-18',
    'end-date': 'today',
    metrics: 'ga:pageviews',
    dimensions: 'ga:city,ga:latitude,ga:longitude,ga:country,ga:countryIsoCode',
  })

  const locations = response.data.rows
    .map(([city, lat, lng, country, countryIsoCode, count]) => {
      return {
        city: city,
        lat: parseInt(lat),
        lng: parseInt(lng),
        country: country,
        country_code: countryIsoCode,
        count: parseInt(count),
      }
    })
    .sort((a, b) => a.country.localeCompare(b.country))
    .filter((item) => {
      if (item.country === '(not set)' || item.city === '(not set)') {
        return null
      } else {
        return item
      }
    })
    .forEach((location, index) => {
      const id = `${location.lat}${location.lng}-${index}`
      createNode({
        ...location,
        id: id,
        internal: {
          type: LOCATIONS,
          contentDigest: createContentDigest(id),
        },
      })
    })
}

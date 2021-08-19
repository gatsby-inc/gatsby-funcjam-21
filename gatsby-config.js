require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    url: ``,
    title: `Groovy Analytics`,
    image: ``,
    description: ``,
    language: ``,
    keywords: ``,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-react-helmet`,
  ],
}

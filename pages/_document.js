import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

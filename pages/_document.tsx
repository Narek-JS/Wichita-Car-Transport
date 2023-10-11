import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Oakland auto transport" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="100" />
        <meta property="og:image" content="assets/images/logo.png" />
        <meta property="og:image:alt" content="Oakland auto transport Logo" />
        <meta name="author" content="Oakland auto transport" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="theme-color" content="#3d7385" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="assets/images/logo.png" />
        <meta name="twitter:image:alt" content="Oakland auto transport Logo" />
        <meta name="description" content="Oakland auto transport CRM Website" />
        <meta
          name="copyright"
          content={`2023-${new Date().getFullYear()} Oakland auto transport Ltd`}
        />
        <meta
          content="CRM, Oakland auto transport CRM, Oakland auto transport Company"
          name="kaywords"
        />
        <meta
          name="google-site-verification"
          content={`google-site-verification=${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}`}
        />

        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

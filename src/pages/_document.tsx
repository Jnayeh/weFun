import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='dark'>
      <Head />
      <body className="min-h-screen dark:text-white bg-slate-100 dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
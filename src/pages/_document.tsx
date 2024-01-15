import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-smooth">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}

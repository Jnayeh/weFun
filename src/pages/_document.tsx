import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-smooth">
      <Head />
      <body className="min-h-screen bg-beige dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}

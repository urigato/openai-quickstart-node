// 1. import `NextUIProvider` component
import Script from 'next/script';
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-X114QSSVG5"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X114QSSVG5');
            `}
        </Script>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;

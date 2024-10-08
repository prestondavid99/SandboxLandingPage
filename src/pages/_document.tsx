import { Html, Head, Main, NextScript } from 'next/document'
import { Toaster } from "react-hot-toast";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <body>
                <Main/>
                <NextScript/>
                <Toaster />
            </body>
        </Html>
    )
}
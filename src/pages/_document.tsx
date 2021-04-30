/* eslint-disable dot-notation */
import Document, { Head, Main, NextScript, Html } from "next/document";
import { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render(): ReactElement {
    return (
      <Html>
        <Head>
          <style>{`body { display: block !important }`}</style>
          {this.props["styleTags"]}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

//testing

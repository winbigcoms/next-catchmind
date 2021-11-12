import Document, { Head, Main, NextScript } from "next/document";

export default class RootDocument extends Document {
  static getInitialProps({ renderPage }) {
    return renderPage();
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

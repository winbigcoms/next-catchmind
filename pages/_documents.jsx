import Document, { Html, Head, Main, NextScript } from "next/document";
import "../fireWork.scss";

export default class RootDocument extends Document {
  // static getInitialProps({ renderPage }) {
  //   return renderPage();
  // }

  render() {
    return (
      <Html>
        <Head>
          <title>캣치마인드</title>
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

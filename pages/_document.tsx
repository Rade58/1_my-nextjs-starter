/* eslint react/react-in-jsx-scope: 0 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import { extractCritical } from "@emotion/server";

import CommonSeo from "@/components/seo/CommonSeo";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps: DocumentInitialProps = await Document.getInitialProps(
      ctx
    );

    const page = await ctx.renderPage();

    const styles = extractCritical(page.html);

    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            // eslint-disable-next-line
            // @ts-ignore
            data-emotion-css={this.props.ids.join(" ")}
            // eslint-disable-next-line
            // @ts-ignore
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          {/* COMMONN SEO */}
          <CommonSeo />
        </Head>
        {/* <body className="font-sans"> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

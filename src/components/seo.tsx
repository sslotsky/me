/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { useStaticQuery, graphql } from "gatsby";

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined };

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: Meta[];
  title: string;
}

const SEO: React.SFC<SEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterHandle
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.twitterHandle,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterHandle,
        },
        {
          name: `twitter:image`,
          content: "https://saxyfool.dev/things-and-stuff.jpg",
        },
        {
          name: `twitter:image:alt`,
          content: "Me and my cat, Jim",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;

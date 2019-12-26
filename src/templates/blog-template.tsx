import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Container = styled.div`
  padding: 3rem;
`;

interface TemplateProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

const Template: React.SFC<TemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
  },
}) => {
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Container>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const TitleHeading = styled.h3``;

const Title: React.SFC<{ path: string }> = ({ path, children }) => (
  <Link to={path}>
    <TitleHeading>{children}</TitleHeading>
  </Link>
);

const Bottom = styled.div`
  position: absolute;
  bottom: 0em;
  width: 100%;
  height: 4rem;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const Container = styled.div`
  position: relative;
  padding: 0 5rem;

  a {
    text-decoration: none;
    color: currentColor;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Edge {
  node: {
    id: string;
    excerpt: string;
    frontmatter: {
      title: string;
      path: string;
    };
  };
}

interface BlogProps {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
}

const BlogIndex: React.SFC<BlogProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges.map(({ node: { id, frontmatter, excerpt } }) => (
    <Container key={id}>
      <Title path={frontmatter.path}>{frontmatter.title}</Title>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Bottom />
    </Container>
  ));

  return (
    <Layout>
      <SEO title="Blog" />
      {Posts}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 450)
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`;

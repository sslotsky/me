import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import GatsbyImage from "gatsby-image";

interface Image {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
}

interface Edge {
  node: {
    id: string;
    html: string;
    frontmatter: {
      title: string;
      url: string;
      image: Image;
    };
  };
}

interface ProjectProps {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
}

const Container = styled.div`
  margin-bottom: 2rem;
  padding: 0 5rem;
`;

const ProjectImage: React.SFC<{ image: Image }> = ({ image }) => (
  <a target="_blank" href={image.childImageSharp.fluid.src}>
    <GatsbyImage fluid={image.childImageSharp.fluid} />
  </a>
);

const Project = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const TitleHeading = styled.h3``;

const TitleLink = styled.a`
  text-decoration: none;
  color: currentColor;

  &:hover {
    text-decoration: underline;
  }
`;

const Title: React.SFC<{ url: string }> = ({ url, children }) => (
  <TitleLink href={url} target="_blank">
    <TitleHeading>{children}</TitleHeading>
  </TitleLink>
);

const ProjectsPage: React.SFC<ProjectProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges.map(({ node: { id, frontmatter, html } }) => (
    <Container key={id}>
      <Title url={frontmatter.url}>{frontmatter.title}</Title>
      <Project>
        <ProjectImage image={frontmatter.image} />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Content>
      </Project>
    </Container>
  ));

  return (
    <Layout>
      <SEO title="Projects" />
      {Posts}
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___title] }
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            url
            title
            image {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Container = styled.div`
  margin-bottom: 2rem;
  padding: 0 5rem;
`;

const ProjectThumbnail = styled.div<{ src: string }>`
  height: 5rem;
  background: ${props => `url(${props.src})`};
  background-size: cover;
`;

const ProjectImage: React.SFC<{ src: string }> = ({ src }) => (
  <a target="_blank" href={src}>
    <ProjectThumbnail src={src} />
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

interface Edge {
  node: {
    id: string;
    html: string;
    frontmatter: {
      title: string;
      url: string;
      image: string;
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

const ProjectsPage: React.SFC<ProjectProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges.map(({ node: { id, frontmatter, html } }) => (
    <Container key={id}>
      <Title url={frontmatter.url}>{frontmatter.title}</Title>
      <Project>
        <ProjectImage src={frontmatter.image} />
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
      filter: { fileAbsolutePath: { regex: "/projects/" } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            url
            title
            image
          }
        }
      }
    }
  }
`;

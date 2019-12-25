import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ProjectImage = styled.div<{ src: string }>`
  height: 5rem;
  background: ${props => `url(${props.src})`};
  background-size: cover;
`;

const Project = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const Title = styled.h2`
  text-align: center;
`;

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges.map(({ node: { id, frontmatter, html } }) => (
    <div key={id}>
      <Title>{frontmatter.title}</Title>
      <Project>
        <ProjectImage src={frontmatter.image} />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Content>
      </Project>
    </div>
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            image
          }
        }
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ProjectImage = styled.img`
  height: 5rem;
`;

const Project = styled.div`
  display: flex;
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
  const Posts = edges.map(({ node: { id, frontmatter } }) => (
    <div key={id}>
      <Title>{frontmatter.title}</Title>
      <Project>
        <ProjectImage src={frontmatter.image} />
        <Content>
          <ReactMarkdown source={frontmatter.description} />
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
          frontmatter {
            title
            image
            description
          }
        }
      }
    }
  }
`;

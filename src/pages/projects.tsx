import React from "react";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import Img from 'gatsby-image'
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

const ProjectImage: React.SFC<{ url:string,src: any }> = ({ url,src }) => (
  <a target="_blank" href={url}>
      <Img fluid={src}/>
  </a>
)

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
      image: {
        childImageSharp:{
          fluid:{
            aspectRatio:number,
            src:string,
            srcSet:string,
            sizes:string
          }
        }
      };
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
        <ProjectImage src={frontmatter.image.childImageSharp.fluid} url={frontmatter.url} />
        {/* <Img fluid={frontmatter.image.childImageSharp.fluid} /> */}
        
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
/* 
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
 */

 // updated query to grab the frontmatter key image as a File with gatsby-plugin-sharp and gatsby-transformer-sharp
 // as with the proposed change to the location of the assets, the frontmatter element image will be a implemented as a File Node, not a string 
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
          image{
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

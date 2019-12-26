import React from "react";
import { styled } from "linaria/react";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const Background = styled(BackgroundImage)`
  height: 100vh;
  position: relative;
`;

const Backdrop = styled.div`
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Notice = styled.h2`
  color: white;
  text-align: center;
`;

const Construction = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "construction.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Background fluid={data.placeholderImage.childImageSharp.fluid}>
      <Backdrop>
        <Notice>This page is under construction</Notice>
      </Backdrop>
    </Background>
  );
};

export default Construction;

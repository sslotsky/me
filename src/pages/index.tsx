import React from "react";
import { styled } from "linaria/react";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const Container = styled.div`
  display: grid;
  grid-template-areas: "bio pic";
  grid-template-columns: 70% 30%;
  grid-gap: 2rem;
`;

const Pic = styled.div`
  grid-area: pic;
  max-width: 300px;

  .gatsby-image-wrapper {
    border-radius: 0.5rem;
  }
`;

const Bio = styled.div`
  grid-area: bio;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <Bio>
        <h1>Hello, world!</h1>
        <p>
          Welcome to my personal site. I'm Sam Slotsky, a jazz saxophonist
          poorly disguised as a software engineer. I've been coding
          professionally since 2009, using a variety of different frontend,
          backend, and database technologies. I'm also a huge fan of the ML
          family of languages. But my favorite language is music.
        </p>
        <p>
          I also like to cook, play chess, ride my bike, and go camping in
          northern Minnesota with my amazing wife and kids. What else would you
          like to know?
        </p>
      </Bio>
      <Pic>
        <Image />
      </Pic>
    </Container>
  </Layout>
);

export default IndexPage;

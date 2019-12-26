import React from "react";
import { styled } from "linaria/react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Haiku = styled.p`
  font-style: italic;
  text-indent: -1.5rem;
  margin-left: 1.5rem;
  color: white;
`;

const Background = styled.div`
  background: url(../images/desolation.jpg);
  background-size: cover;
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

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Background>
      <Backdrop>
        <Haiku>
          Wind catches lily
          <br /> Scatt'ring petals to the wind:
          <br /> Your site is not found.
        </Haiku>
      </Backdrop>
    </Background>
  </Layout>
);

export default NotFoundPage;

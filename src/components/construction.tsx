import React from "react";
import { styled } from "linaria/react";

const Background = styled.div`
  background: url(../images/construction.jpg);
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

const Notice = styled.h2`
  color: white;
  text-align: center;
`;

const Construction = () => (
  <Background>
    <Backdrop>
      <Notice>This page is under construction</Notice>
    </Backdrop>
  </Background>
);

export default Construction;

import { styled } from "linaria/react";
import { Link } from "gatsby";
import React from "react";

import me from "../images/me.jpg";

const Logo = styled.img`
  margin-bottom: 0;
  height: 3rem;
  border-radius: 3rem;
`;

const Heading = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Nav = styled.nav`
  padding: 1rem;
  display: flex;
`;

const Header = () => {
  return (
    <Heading>
      <Nav>
        <Link
          to="/"
          style={{
            display: "flex",
          }}
        >
          <Logo src={me} />
        </Link>
      </Nav>
    </Heading>
  );
};

export default Header;

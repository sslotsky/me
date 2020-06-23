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
  background: linear-gradient(45deg, hsl(35, 100%, 50%), hsl(50, 100%, 75%));
  margin-bottom: 1.45rem;
`;

const Nav = styled.nav`
  padding: 1rem;
  display: flex;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface NavLinkProps {
  path: string;
}

const NavLink: React.SFC<NavLinkProps> = ({ path, children }) => (
  <Link
    to={path}
    style={{
      color: "white",
      textDecoration: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "1.5rem",
    }}
  >
    {children}
  </Link>
);

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
        <NavLinks>
          <NavLink path="/projects">Projects</NavLink>
          <NavLink path="/blog">Blog</NavLink>
        </NavLinks>
      </Nav>
    </Heading>
  );
};

export default Header;

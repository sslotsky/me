import { styled } from "linaria/react";
import { Link } from "gatsby";
import React from "react";

import me from "../images/me.jpg";

const Logo = styled.img`
  margin-bottom: 0;
  height: 3rem;
  border-radius: 3rem;
`;

const Header = () => {
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          padding: `1rem`,
          display: "flex",
        }}
      >
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            display: "flex",
          }}
        >
          <Logo src={me} />
        </Link>
      </div>
    </header>
  );
};

export default Header;

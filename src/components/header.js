import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import me from "../images/me.jpg"

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
          <img
            src={me}
            alt="Me"
            style={{ marginBottom: 0, height: "3rem", borderRadius: "3rem" }}
          />
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

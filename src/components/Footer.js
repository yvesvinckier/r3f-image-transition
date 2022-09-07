import React from "react";
import styled from "styled-components";

const StyledCredit = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 20;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  line-height: 2;

  a {
    color: #fff;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const Footer = () => {
  return (
    <StyledCredit>
      <small>
        Images from Unsplash by{" "}
        <a
          href="https://unsplash.com/photos/i7viNsvJa2c"
          target="_Blank"
          rel="noreferrer"
        >
          Baghaei photography
        </a>
      </small>

      <small>
        Images from Unsplash by{" "}
        <a
          href="https://unsplash.com/photos/yh2caIMEk0M"
          target="_Blank"
          rel="noreferrer"
        >
          Ehsan Ahmadi
        </a>
      </small>
    </StyledCredit>
  );
};

export default Footer;

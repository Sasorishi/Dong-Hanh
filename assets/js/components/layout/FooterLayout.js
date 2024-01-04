import React from "react";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className="bg-amber text-cognac p-20">
      <div className="text-center">
        <p>
          © Copyright 2022 - {currentYear} |{" "}
          <a className="text-reset fw-bold" href="">
            Đồng Hành Network
          </a>{" "}
          |{" "}
          <a href="https://viettan.org/" target="_blank">
            VIET TAN
          </a>{" "}
          | All Rights Reserved by Đồng Hành Network
        </p>
      </div>
    </footer>
  );
};

export default Footer;

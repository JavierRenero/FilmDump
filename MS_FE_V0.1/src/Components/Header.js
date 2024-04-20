/**
 * Header component for the FilmDump application.
 * Renders the header section with the FilmDump logo and title.
 *
 * @returns {JSX.Element} The rendered header component.
 */
import React from "react";

const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center w-100 text-uppercase p-3 header">
            <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="FilmDump Icon" className="mr-2" style={{ width: "65px", height: "65px" }} />
            FilmDump
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

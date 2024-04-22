import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  /**
   * Array of objects representing data for the footer.
   *
   * @type {Array<Object>}
   */
  const data = [
    {
      icon: "fas fa-home",
      name: "Home",
      link: "/",
      id: 0,
    },{
      icon: "fas fa-film",
      name: "Create Movie",
      link: "/movies/new",
      id: 1,
    }
    
  ];
  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center bg-dark footer">
            {data.map((Val) => {
              return (
                <>
                  <NavLink to={`${Val.link}`}>
                    <button
                      className="col-sm-2 col-md-2 btn btn-dark"
                      key={Val.id}
                    >
                      <i className={`${Val.icon}`} id="film"></i>
                      <br />
                      <h5 className="pt-1 fs-6">{Val.name}</h5>
                    </button>
                    
                  </NavLink>
                </>
              );
            })}
            <div className="text-white footer1">
              <br/> Made By : Javier :D <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

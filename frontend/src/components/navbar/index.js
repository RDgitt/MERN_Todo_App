import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 mt-0">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            <h4>TODO</h4>
          </Link>

          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {
                localStorage.getItem('accessToken') ?  <div class="d-flex demo"><li className="nav-item">
                <button className="logout-btn" onClick={handleClick}>
                  LogOut
                </button>
              </li>
              </div> :
              <div class="d-flex demo">
              
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
             {/*  <li className="nav-item">
                <button className="logout-btn" onClick={handleClick}>
                  LogOut
                </button>
              </li> */}
              </div>
              }
            {/*   <div class="d-flex demo">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
             
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

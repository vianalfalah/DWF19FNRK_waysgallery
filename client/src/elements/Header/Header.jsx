import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Context } from "../../Context/Context";
import { logoutService } from "../../configs/services";
import userIcon from "../../assets/icon/userIcon.png";
import "./Header.css";
import { LOGO, PROFILE, LOGOUT } from "./../../configs/icons";

function Header() {
  const [state, dispatch] = useContext(Context);

  const [showDropdown, setShowDropdown] = useState(false);

  const onLogout = (e) => {
    logoutService(dispatch);
  };

  const _handleOpenDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Navbar fixed="top" className="header-container">
        <Link to="/home">
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
        </Link>
        <div className="align-center"></div>

        <div className="dropdown">
          <img
            src={PROFILE}
            alt="user"
            className="img-profile dropbtn"
            onClick={_handleOpenDropdown}
          ></img>
          <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
            <Link to="/profile">
              <div className="dropdown-btn">
                <img
                  src={userIcon}
                  alt="profile-icon"
                  className="dropdown-img-icon"
                />
                <p className="dropdown-text profile-text">Profile</p>
              </div>
            </Link>
            <div onClick={onLogout} className="dropdown-btn">
              <img
                src={LOGOUT}
                alt="logut-icon"
                className="dropdown-img-icon"
              />
              <p className="dropdown-text">Logout</p>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;

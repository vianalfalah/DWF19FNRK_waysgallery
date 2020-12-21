import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import { Context } from "../../Context/Context";
import { logoutService } from "../../configs/services";
import USER from "../../assets/icons/user 1.svg";
import ORDER from "../../assets/icons/order.svg";
import "./Header.css";
import { LOGO, PROFILE, LOGOUT } from "../../configs/icons";

function Header() {
  const [state, dispatch] = useContext(Context);

  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  const onLogout = (e) => {
    logoutService(dispatch);
    history.push("/");
  };

  const _handleOpenDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Navbar className="header-container">
        <Link to="/home">
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
        </Link>
        <Link to="/upload">
          <Button className="upload">Upload</Button>
        </Link>

        <div className="dropdown">
          <img
            src={PROFILE}
            alt="user"
            className="img-profile dropbtn"
            onClick={_handleOpenDropdown}
          ></img>
          <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
            <Link to="/my-profile">
              <div className="dropdown-btn">
                <img
                  src={USER}
                  alt="profile-icon"
                  className="dropdown-img-icon"
                />
                <p className="dropdown-text profile-text">Profile</p>
              </div>
            </Link>
            <Link to="/order">
              <div className="dropdown-btn">
                <img
                  src={ORDER}
                  alt="profile-icon"
                  className="dropdown-img-icon"
                />
                <p className="dropdown-text profile-text">Order</p>
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

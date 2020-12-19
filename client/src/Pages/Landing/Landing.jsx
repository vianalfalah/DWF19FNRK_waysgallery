import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./Landing.css";

import {
  WAYSGALLERY,
  ASSETS,
  VECTOR1,
  VECTOR2,
  LOGO,
} from "../../configs/landing";
// components

import ModalLogin from "../../component/Login";
import ModalRegister from "../../component/Regis";

function Landing() {
  const [state, dispatch] = useContext(Context);
  const { isLogin } = state;

  const history = useHistory();

  return (
    <>
      <div className="w-screen h-screen max-h-screen grid grid-cols-2 px-32">
        <div className="self-center">
          <img
            src={VECTOR1}
            alt="vector1"
            className="absolute h-1/2 top-0 left-0"
          />
          <div>
            <img src={WAYSGALLERY} alt="ways" className="ways-gallery" />
            <img src={LOGO} alt="logo" className="vector" />
          </div>

          <div className="wrap1">
            <h1 className="title">show your work to inspire everyone</h1>
            <p>
              Ways Exhibition is a website design creators gather to share their
              work with other creators.
            </p>
          </div>
          <img className="hero-logo" src={ASSETS} alt="LandingPage" />
          <img src={VECTOR2} alt="vector2" className="vector2" />
        </div>
        {isLogin ? (
          <Button className="join" onClick={() => history.push("/home")}>
            <p style={{ alignItems: "center", textAlign: "center" }}>Home</p>
          </Button>
        ) : (
          <NotLogin dispatch={dispatch} state={state} />
        )}
      </div>
    </>
  );
}

const NotLogin = ({ dispatch, state }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const onLogin = () => {
    setShowLogin(true);
  };
  const onRegister = () => {
    setShowRegister(true);
  };

  return (
    <>
      <div className="grp-btn">
        <Button className="join" onClick={onRegister}>
          <p>Join Now</p>
        </Button>
        <Button className="loginn" onClick={onLogin}>
          <p>Login</p>
        </Button>
      </div>

      <ModalLogin
        show={showLogin}
        setShow={setShowLogin}
        switchModal={setShowRegister}
        dispatch={dispatch}
        state={state}
      />
      <ModalRegister
        show={showRegister}
        setShow={setShowRegister}
        switchModal={setShowLogin}
        dispatch={dispatch}
        state={state}
      />
    </>
  );
};

export default Landing;

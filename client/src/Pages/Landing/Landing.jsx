import { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Context } from "../../Context/Context";
import "./Landing.css";

// components
import ModalLogin from "../../elements/Login";
import ModalRegister from "../../elements/Regis";

const Landing = () => {
  const [state, dispatch] = useContext(Context);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const history = useHistory();

  return (
    <Container className="landing">
      <Row noGutters style={{ width: "100%" }}>
        <Col md={5}>
          <h1 className="tnr" style={{ fontFamily: "Times New Roman" }}>
            <strong>show your work to inspire everyone</strong>
          </h1>
          <p>Ways Exhibition is a website design creators gather</p>
          <p>to share their work with other creators.</p>
          <br />
          {state.isLogin ? (
            <Button
              variant="primary"
              className="mr-4 lg"
              onClick={() => history.push("/home")}
            >
              Home
            </Button>
          ) : (
            <>
              <Button
                variant="success"
                className="mr-4 lg"
                onClick={() => setShowRegister(true)}
              >
                Join Now
              </Button>
              <Button
                variant="secondary"
                className="lg"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
            </>
          )}
        </Col>

        <img src="" alt="landing" className="landing-image" />

        <ModalLogin
          show={showLogin}
          onHide={() => setShowLogin(false)}
          switchModal={setShowRegister}
          dispatch={dispatch}
        />
        <ModalRegister
          show={showRegister}
          onHide={() => setShowRegister(false)}
          switchModal={setShowLogin}
          dispatch={dispatch}
          state={state}
        />
      </Row>
    </Container>
  );
};

export default Landing;

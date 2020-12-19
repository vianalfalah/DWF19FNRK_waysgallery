import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Detail from "./Pages/Detail/Detail";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import UserProfile from "./Pages/UserProfile/UserProfile";
import PrivateRoute from "./component/PrivateRoute";
import { Context } from "./Context/Context";
import { loadedService } from "./configs/services";
import Landing from "./Pages/Landing/Landing";

function App() {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadedService(dispatch);
      setLoading(false);
    })();
  }, [dispatch]);
  return (
    <div className="main-container">
      <Router>
        {loading ? (
          <div>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
          </div>
        ) : (
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/detail/:id" component={Detail} />
            <PrivateRoute exact path="/my-profile" component={Profile} />
            <PrivateRoute exact path="/profile/:id" component={UserProfile} />
            {/* 
            <PrivateRoute exact path="/ship" component={Ship} />
            <PrivateRoute exact path="/cart" component={Cart} />
             */}
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;

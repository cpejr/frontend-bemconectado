import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Pendings from "./pages/Pendings";
import List from "./pages/List";
import UploadTest from "./pages/UploadTest";
import Home from "./pages/Home";
import OngShow from "./pages/OngShow";
import Login from "./pages/Login";
import AdmMenu from "./components/AdmMenu";
import Stats from "./pages/Adm/Stats";
import Profile from "./pages/Adm/Profile";
import Finance from "./pages/Adm/Finance";
import Campaign from "./pages/Adm/Campaign";
import ForgotPassword from "./pages/ForgotPassword";
import { LoginContext } from "./contexts/LoginContext";
import ClipLoader from "react-spinners/ClipLoader";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ongShow" exact component={OngShow} />
        <Route path="/list" exact component={List} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/register" exact component={Register} />
        <Route path="/pendings" exact component={Pendings} />
        <Route path="/login" exact component={Login} />
        <Route path="/imgupload" exact component={UploadTest} />
        <Route path="/adm" component={AdmArea} />
        <Route component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

function AdmArea() {
  const { user } = useContext(LoginContext);
  console.log("Usuario atual do AdmArea: ", user);
  if (user === "notYet") return <Loading/>;
  if (user === null || user.type === "admin") return <Redirect to="/" />;
  else
    return (
      <AdmMenu>
        <Switch>
          <Route exact path="/adm/stats" component={Stats} />
          <Route exact path="/adm/profile" component={Profile} />
          <Route exact path="/adm/finance" component={Finance} />
          <Route exact path="/adm/campaign" component={Campaign} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </AdmMenu>
    );
}

function Loading(){
  return (
    <div className="loading">
      <div className="loading-logo">
        <ClipLoader size={100} color={"#123abc"} loading={true} />
      </div>
    </div>
  );
}

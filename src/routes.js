import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Pendings from './pages/Pendings';
import List from './pages/List';
import UploadTest from './pages/UploadTest';
import Pending from './pages/Pendings/Pending/OngCard';
import Home from './pages/Home';
import OngShow from './pages/OngShow';
import Login from './pages/Login';
import Adm from './pages/Adm';
import Stats from './pages/Adm/Stats';

export default function Routes() {
  const token = localStorage.getItem("accessToken")
  console.log("O token dentro do localstoarge é " + token)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ongShow" component={OngShow} />
        <Route path="/list" component={List} />
        <Route path="/register" component={Register} />
        <Route path="/pendings" component={Pendings} />
        <Route path="/adminONG" component={Pending} />
        <Route path="/imgupload" component={UploadTest} />
        <Adm>
          <Route exact path="/adm/stats" component={Stats} />
        </Adm>
        {(token !== null) ? <Route path="/login" component={Pendings} /> : <Route path="/login" component={Login} />}
        <Route component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

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

export default function Routes() {
  const token = localStorage.getItem("accessToken")
  console.log("O token dentro do localstoarge é " + token)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ongShow" exact  component={OngShow} />
        <Route path="/list" exact component={List} />
        <Route path="/register" exact component={Register} />
        <Route path="/pendings" exact component={Pendings} />
        <Route path="/adminONG" exact component={Adm} />
        <Route path="/imgupload" exact component={UploadTest} />
        <Adm>
           <Route path="/stats" exact component={() => <div>pudim</div>} />
        </Adm>
        
        {(token !== null) ? <Route path="/login" component={Pendings} /> : <Route path="/login" component={Login} />}
      </Switch>
    </BrowserRouter>
  );
}

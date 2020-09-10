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
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ongShow" exact  component={OngShow} />
        <Route path="/list" exact component={List} />

        <Route path="/register" exact component={Register} />
        <Route path="/pendings" exact component={Pendings} />
        <Route path="/adminONG" exact component={Adm} />
        
        <Adm>
           <Route path="/stats" exact component={() => <div>pudim</div>} />
        </Adm>        
    
        <Route path="/imgupload" component={UploadTest} />
        <Route path="/login" component={Login} />

      </Switch>
    </BrowserRouter>
  );
}

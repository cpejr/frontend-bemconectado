import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AllPendings from './AllPendings'

import './styles.css';

export default function Pendings(props) {

  const history = useHistory();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      history.push('/')
      alert("Por algum motivo o token sumiu")
    }
  }, [])

  return (
    <div>
      {token && <AllPendings token={token} />}
    </div>
  );
}
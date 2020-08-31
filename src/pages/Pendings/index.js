import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AllPendings from './AllPendings'

import './styles.css';

export default function Pendings() {

  const history = useHistory();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      history.push('/');
      alert("For some reason i didn't receive a token");
    }
  });

  return (
    <div>
      {token && <AllPendings token={token} />}
    </div>
  );
}
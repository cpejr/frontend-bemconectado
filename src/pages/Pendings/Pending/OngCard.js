
import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import CategContainer from '../../../components/Categ/CategContainer'
import api from '../../../services/api';
import Container from './OngContainer'

export default function OngCard({ token }) {

  const [finalized, setFinalized] = useState(false);
  const [categVec, setCategVec] = useState([]);
  const checkedVector = useRef([]);

  const ong = useRef();

  const { addToast } = useToasts();

  useEffect(() => {
    api.get('categ').then((categNamesResponse) => {
      setCategVec(categNamesResponse.data);
    });
  }, []);

  const handleCheck = async (state) => {
    let auxVector = [];
    Object.keys(state).forEach((value) => {
      if (state[value]) {
        auxVector.push(value);
      }
    })
    checkedVector.current = auxVector;
  }

  const handleApproved = async () => {

    const _ong = { ...ong.current };
    delete _ong._id;
    delete _ong.createdAt;
    delete _ong.updatedAt;
    delete _ong.__v;

    try {
      await api.put(`admin/${ong.current._id}`,
        {
          ..._ong,
          approved: true
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        });

      await api.put('categ',
        { ong: { _id: ong.current._id }, categ: checkedVector.current },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      addToast("Ong aprovada com sucesso!", { appearance: "success" });
      setFinalized(true);
    }
    catch (err) {
      console.warn(err);
      addToast("Erro na aprovação da ong!", { appearance: "error" });
    }
  }

  const handleRejected = async () => {
    try {
      await api.delete(`admin/${ong.current._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addToast("Ong reprovada com sucesso!", { appearance: "success" });
      setFinalized(true);
    } catch (err) {
      console.warn(err);
      addToast("Erro na reprovação da ong!", { appearance: "error" });
    }
  }

  return (
    <div>
      {ong.current && !finalized ? (
        <div className="ONGcard">

          <div id="bttn" style={{ "margin-bottom": "20px" }}>
            <Link className="btn1 btn--radius btn--blue" to={{
              pathname: '/Pendings',
              state: {
                token: token
              }
            }}>
              VOLTAR
            </Link>
          </div>
          <h1 className="pendingsTitle">ONG PENDENTE</h1>
          <Container ong={ong.current} onChange={(_ong) => ong.current = _ong} />
          <CategContainer categNames={categVec} onChange={(state) => handleCheck(state)} />
          <Button variant="contained" onClick={() => handleApproved()} style={{ backgroundColor: '#3ae857' }} >APROVAR</Button>
          <Button variant="contained" onClick={() => handleRejected()} style={{ backgroundColor: '#e83a3a' }} > REPROVAR</Button>
        </div>
      ) : (
          <Redirect to={{
            pathname: '/Pendings',
            state: {
              token: token
            }
          }} />
        )}
    </div>
  )
}
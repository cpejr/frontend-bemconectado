import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import './styles.sass'
import '../Mobile/styles.css'

import { IconContext } from "react-icons";
import { MdPlace, MdLocalPhone, MdEmail, MdAccountBalanceWallet } from "react-icons/md";
import { AiOutlineGlobal, AiFillBank } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { Button, Chip, Typography } from '@material-ui/core';
import { FaFacebookF, FaCodeBranch } from "react-icons/fa";
import { BsEyeFill } from 'react-icons/bs'
import picpayIcon from '../../../../images/picpay.png';


const classes = {
  linkContent: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10,
    height: 60,
    width: '80%'
  },
  link: {
    flexWrap: "nowrap",
    overflow: 'hidden',
    textOverflow: 'ellipis',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5,
  },
  linkIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
    padding: 5,
    width: '20%',
    border: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRight: 1,
    borderRightColor: '#ced4da',
    borderStyle: 'solid',
  },
  bankRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputBank: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  bankText: {
    backgroundColor: '#e9ecef',
    padding: 5,
    border: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRight: 1,
    borderRightColor: '#ced4da',
    borderStyle: 'solid',
    height: '100%',
    width: '40%',
    color: '#495057',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'end',
    justifyContent: 'center',
  },
  bankGroup: {
    height: 60,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    flexGrow: 1
  },
}





export default function Desktop({ ong, categs }) {

  const [_categs, setCategs] = useState([]);

  useEffect(() => {
    if (categs) setCategs(categs);
  }, [categs])

  return (
    <div className="Desktop">
      <div className="backButton">
        <IconContext.Provider value={{ size: '1.8em', color: "#ffff" }}>
          <IoIosArrowBack />
        </IconContext.Provider>
        <Link style={{ color: "#ffff" }} to="/list">VOLTAR</Link>
      </div>
      <div className="DesktopInside">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


        <div className="ong">
          <div className="leftHalf">

            <div>
              <h2>{ong.name}</h2>
              <p>CNPJ/CPF: {ong.cnpj}</p>
              <div style={{ display: 'flex' }}>
                {
                  _categs && _categs.map((name) => {
                    return (
                      <Chip key={name} size="small" label={name} style={{ marginRight: 5 }} />
                    )
                  })
                }
              </div>
            </div>

            <div className="adressAndPhone">
              <div className="adress">
                <IconContext.Provider value={{ size: '2.5em' }}>
                  <MdPlace />
                </IconContext.Provider>
                <a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/maps?q=${ong.street},${ong.number},${ong.city},${ong.state},${ong.cep}`}>
                  {ong.state}, {ong.city}, {ong.street}, {ong.number}
                </a>
              </div>
              <div className="phone">
                <IconContext.Provider value={{ size: '1.8em' }}>
                  <MdLocalPhone />
                </IconContext.Provider>
                <div>({ong.ddd}){ong.phoneNumber}</div>
              </div>
            </div>

            <div style={{maxHeight: '40%', overflow: 'auto'}}>
              {ong.description}
            </div>

            <div>
              {ong.site && (
                <div style={classes.linkContent}>
                  <div style={classes.linkIcon}>
                    <IconContext.Provider value={{ color: "#495057", size: '1.8em' }}>
                      <AiOutlineGlobal />
                    </IconContext.Provider>
                  </div>
                  <div style={classes.link}>
                    <Typography>
                      <a target="_blank" rel="noopener noreferrer" href={ong.site}>{ong.site}</a>
                    </Typography>
                  </div>
                </div>
              )}

              {ong.email && (
                <div style={classes.linkContent}>
                  <div style={classes.linkIcon}>
                    <IconContext.Provider value={{ color: "#495057", size: '1.8em' }}>
                      <MdEmail />
                    </IconContext.Provider>
                  </div>
                  <div style={classes.link}>
                    <Typography>
                      {ong.email}
                    </Typography>
                  </div>
                </div>
              )}

              {/* <div style={classes.linkContent}>
                  <div style={classes.linkIcon}>
                    <IconContext.Provider value={{ color: "#495057", size: '1.8em' }}>
                      <BsEyeFill />
                    </IconContext.Provider>
                  </div>
                  <div style={classes.link}>
                    <Typography>
                      <b>1893</b> vizualizações na semana
                    </Typography>
                  </div>
              </div> */}

            </div>

            <div className="divButtons">
              {ong.facebook && (
                <Button variant="outlined" target="_blank" href={`${ong.facebook}`} className="iconButton facebookBorder">
                  <div>
                    <IconContext.Provider value={{ color: "#3b5998", size: '3.5em' }}>
                      <FaFacebookF />
                    </IconContext.Provider>
                  </div>
                </Button>
              )}

              {ong.instagram && (
                <Button variant="outlined" target="_blank" href={ong.instagram} className="iconButton instagramBorder">
                  <div className="center">
                    <i className="fa fa-instagram" />
                  </div>
                </Button>
              )}
            </div>

          </div>

          <div className="rightHalf ">

            <img src={`https://drive.google.com/uc?id=${ong.imageSrc}`} alt="Logo" className="ongLogo" />

            <div style={{width: '60%'}}>
              <div style={classes.bankGroup}>
                <div style={classes.bankText}>
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <AiFillBank />
                  </IconContext.Provider>
                  Banco:
                </div>
                <div style={classes.inputBank}>{ong.bank}</div>
              </div>
              <div style={classes.bankGroup}>
                <div style={classes.bankText}>
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <FaCodeBranch />
                  </IconContext.Provider>
                  Agência:
                  </div>
                <div style={classes.inputBank}>{ong.branch}</div>
              </div>
              <div style={classes.bankGroup}>
                <div style={classes.bankText}>
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <MdAccountBalanceWallet />
                  </IconContext.Provider>
                  Conta:
                </div>
                <div style={classes.inputBank}>{ong.bankAccount}</div>
              </div>
            </div>

            {ong.picpay && (
              <Button variant="outlined" target="_blank" href={ong.picpay} className="iconButton picPayBorder">
                <div>
                  <IconContext.Provider value={{ color: "#11C76F", size: '1.7em' }}>
                    <img src={picpayIcon} alt="PicPay" className="icon" />
                  </IconContext.Provider>
                </div>
              </Button>
            )}

          </div>

        </div>
      </div>
    </div>
  )


}
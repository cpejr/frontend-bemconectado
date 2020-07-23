import React, { useState } from 'react';
import './styles.css';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import ImageUpload from '../../components/ImageUpload';
import SelectStates from '../../components/SelectStates';
import TextField from '@material-ui/core/TextField';


export default function Register({ className, fileName, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [complement, setComplement] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [picpay, setPicpay] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [ddd, setDdd] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bank, setBank] = useState('');
  const [site, setSite] = useState('');
  const [branch, setBranch] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [uploadPressed, setUploadPressed] = useState(false);
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    setUploadPressed(true);

    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '')
        data.append(key, value);
    }

    addToData('name', name);
    addToData('description', description);
    addToData('city', city);
    addToData('state', state);
    addToData('street', street);
    addToData('cep', cep);
    addToData('site', site);
    addToData('neighborhood', neighborhood);
    addToData('number', number);
    addToData('complement', complement);
    addToData('cnpj', cnpj);
    addToData('picpay', picpay);
    addToData('facebook', facebook);
    addToData('instagram', instagram);
    addToData('email', email);
    addToData('ddd', ddd);
    addToData('phoneNumber', phoneNumber);
    addToData('bank', bank);
    addToData('branch', branch);
    addToData('bankAccount', bankAccount);
    addToData('imageFile', selectedFile);

    try {
      const response = await api.post('ongs', data);
      alert(`Olá ${response.data.name}, seu cadastro foi realizado com sucesso`);
      history.push('/list');
    } catch (err) {

      if (err.response && err.response.data) {
        let data = err.response.data;

        if (data.message)
          alert(data.message);

        if (data.error)
          if (data.error.errors)
            alert('Por favor preencha os campos obrigatórios');
          else
            alert(data.error);
      }
    }
  }

  function handleImage(img) {
    setSelectedFile(img);
  }


  return (
    <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
      <div className="wrapper wrapper--w790">
        <div className="card card-5">
          <div className="card-heading">
            <h2 className="title">Cadastre a sua instituição abaixo</h2>
            <div id="bttn1">
              <Link
                to="/list"
                className="btn3 btn--radius btn--blue"
              >
                VOLTAR A LISTA
                    </Link>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleRegister}>

              <div className="form-row">
                <div className="name">Nome da instituição*</div>
                <div className="value">
                  <TextField
                    error={name === "" && uploadPressed}
                    name="company"
                    helperText={(name === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                    value={name}
                    onChange={e => { setName(e.target.value) }}
                    variant="filled"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="name">Descrição</div>
                <div className="value">

                  <div className="description">

                    <textarea
                      className="form-control description"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row m-b-55">
                <div className="name">Local</div>
                <div className="value">
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group-desc">
                        <SelectStates
                          className="input--style-5 col-lg-12 selectStates"
                          onChange={e => setState(e)}
                        />
                        <label className="label--desc">Estado*</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-desc">
                        <TextField
                          error={city === "" && uploadPressed}
                          helperText={(city === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          variant="filled"
                        />
                        <label className="label--desc" style={{ "margin-top": "-20px" }}>Cidade*</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">CEP*</div>
                <div className="value">
                  <div className="input-group">
                    <TextField
                      error={cep === "" && uploadPressed}
                      helperText={(cep === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                      value={cep}
                      onChange={e => setCep(e.target.value)}
                      variant="filled"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row m-b-55">
                <div className="name">Endereço</div>
                <div className="value">
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group-desc">
                        <TextField
                          error={neighborhood === "" && uploadPressed}
                          helperText={(neighborhood === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                          value={neighborhood}
                          onChange={e => setNeighborhood(e.target.value)}
                          variant="filled"
                        />
                        <label className="label--desc" style={{ "margin-top": "-20px" }}>Bairro*</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-desc">
                        <TextField
                          error={street === "" && uploadPressed}
                          helperText={(street === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                          value={street}
                          onChange={e => setStreet(e.target.value)}
                          variant="filled"
                        />
                        <label className="label--desc" style={{ "margin-top": "-20px" }}>Rua*</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row m-b-55">
                <div className="name"></div>
                <div className="value">
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group-desc">
                        <TextField
                          error={number === "" && uploadPressed}
                          helperText={(number === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                          value={number}
                          onChange={e => setNumber(e.target.value)}
                          variant="filled"
                        />
                        <label className="label--desc" style={{ "margin-top": "-20px" }}>Número*</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-desc">


                        <input className="input--style-5" type="text"
                          name="last_name"
                          value={complement}
                          onChange={e => setComplement(e.target.value)}
                        />
                        <label className="label--desc">Complemento</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">CNPJ/CPF*</div>
                <div className="value">
                  <div className="input-group">
                    <TextField
                      error={cnpj === "" && uploadPressed}
                      helperText={(cnpj === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                      value={cnpj}
                      onChange={e => setCnpj(e.target.value)}
                      variant="filled"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name"> Link do PICPAY (se tiver)</div>
                <div className="value">
                  <div className="input-group">
                    <input className="input--style-5" type="text"
                      name="company"
                      value={picpay}
                      onChange={e => setPicpay(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">Site</div>
                <div className="value">
                  <div className="input-group">
                    <input className="input--style-5" type="text"
                      name="company"
                      value={site}
                      onChange={e => setSite(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">Link do Facebook</div>
                <div className="value">
                  <div className="input-group">
                    <input className="input--style-5" type="text"
                      name="company"
                      value={facebook}
                      onChange={e => setFacebook(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">Link do Instagram</div>
                <div className="value">
                  <div className="input-group">
                    <input className="input--style-5" type="text"
                      name="company"
                      value={instagram}
                      onChange={e => setInstagram(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">Email*</div>
                <div className="value">
                  <div className="input-group">
                    <TextField
                      error={email === "" && uploadPressed}
                      helperText={(email === "" && uploadPressed) ? 'Campo obrigatório' : ' '}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      variant="filled"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row m-b-55">
                <div className="name">Contato</div>
                <div className="value">
                  <div className="row row-refine">
                    <div className="col-3">
                      <div className="input-group-desc">
                        <input className="input--style-5" type="text"
                          name="ddd"
                          value={ddd}
                          onChange={e => setDdd(e.target.value)}
                        />
                        <label className="label--desc">DDD</label>
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="input-group-desc">
                        <input className="input--style-5" type="text"
                          name="phone"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        />
                        <label className="label--desc">Telefone</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row m-b-55">
                <div className="name">Dados bancarios</div>
                <div className="value">
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group-desc">
                        <input className="input--style-5" type="text"
                          name="first_name"
                          value={bank}
                          onChange={e => setBank(e.target.value)}
                        />
                        <label className="label--desc">Banco</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-desc">


                        <input className="input--style-5" type="text"
                          name="last_name"
                          value={branch}
                          onChange={e => setBranch(e.target.value)}
                        />
                        <label className="label--desc">Agência</label>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row m-b-55">
                <div className="name"></div>
                <div className="value">
                  <div className="row row-space">
                    <div className="col-12">
                      <div className="input-group-desc">
                        <input className="input--style-5" type="text"
                          name="bank_account"
                          value={bankAccount}
                          onChange={e => setBankAccount(e.target.value)}
                        />
                        <label className="label--desc">Número da Conta</label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">Logo da Empresa*</div>
                <div className="value">
                  <div className="input-group">
                    <ImageUpload onChange={handleImage} fileName={'imageFile'} />
                  </div>
                </div>
              </div>

              <div className="btn-enviar-container">
                <button className="btn btn--radius-2 btn btn-warning" type="submit">Enviar</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  );
}



























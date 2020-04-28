import React, { useEffect, useState } from 'react';
import './styles.css';
import Card from './Card';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import SelectState from '../../components/SelectStates';
import { FaFilter, FaSearch } from 'react-icons/fa';
import CategSelector from '../../components/Categ/CategSelector';
import ClipLoader from "react-spinners/ClipLoader";


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export default function List(props) {

  const [loader, setLoader] = useState(true)

  const ONGSPERPAGE = 10;

  const [stateFilter, setStateFilter] = useState();
  const [cityFilter, setCityFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [categFilter, setCategFilter] = useState();
  const [activeFilter, setActiveFilter] = useState(false);
  const [FcityFilter, setFcityFilter] = useState();
  const [FnameFilter, setFnameFilter] = useState();

  const [categs, setCategs] = useState([]);

  const [ongsData, setOngsData] = useState({
    pagesVector: [],
    ongs: [],
    currentPageIndex: 0,
  })

  useEffect(() => {
    const getOngs = async () => {
      try {
        setLoader(true);
        let queryParams = [];

        if (stateFilter)
          queryParams.push(`state=${stateFilter}`);

        if (FcityFilter)
          queryParams.push(`city=${FcityFilter}`);

        if (FnameFilter)
          queryParams.push(`name=${FnameFilter}`);

        if (categFilter)
          queryParams.push(`categs=${categFilter}`);

        queryParams = queryParams.join('&')

        const totalCountResponse = await api.get(`/ongsCount?${queryParams}`);
        const totalCount = totalCountResponse.headers['x-total-count'];

        const pagesVector = [];
        const pages = Math.ceil(totalCount / ONGSPERPAGE);

        for (let i = 1; i <= pages; i++)
          pagesVector.push(i)

        shuffle(pagesVector);

        if (pagesVector.length > 0) {
          let pagesQuery;
          if (queryParams)
            pagesQuery = `&page=${pagesVector[0]}`;
          else
            pagesQuery = `page=${pagesVector[0]}`;

          let ongsResponse = await api.get(`/ongs?${queryParams}${pagesQuery}`);

          let newOngs = [...ongsResponse.data]

          let currentPageIndex = 0;

          if (newOngs.length < ONGSPERPAGE && pagesVector.length > 1) {
            currentPageIndex++

            let currentPage = pagesVector[currentPageIndex];

            let pagesQuery;
            if (queryParams)
              pagesQuery = `&page=${currentPage}`;
            else
              pagesQuery = `page=${currentPage}`;

            const ongsComplementResponse = await api.get(`/ongs?${queryParams}${pagesQuery}`);

            newOngs = [...newOngs, ...ongsComplementResponse.data]
          }
          let newOngsData = { ...ongsData };
          newOngsData.pagesVector = pagesVector;
          newOngsData.ongs = newOngs;
          newOngsData.currentPageIndex = currentPageIndex;
          setOngsData(newOngsData);
          setLoader(false);
        } else {
          let newOngsData = { ...ongsData };

          newOngsData.pagesVector = [];
          newOngsData.ongs = [];
          newOngsData.currentPageIndex = 0;

          setOngsData(newOngsData)
          setLoader(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
    getOngs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFilter, FcityFilter, FnameFilter, categFilter]);

  useEffect(() => {
    const updateOngs = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { //Reached the end of the page.
        const totalPages = ongsData.pagesVector.length;
        let currentPageIndex = ongsData.currentPageIndex;

        if (currentPageIndex < totalPages - 1) {
          currentPageIndex++;

          let currentPage = ongsData.pagesVector[currentPageIndex];

          async function addNewOngs() {
            try {

              let queryParams = [];

              if (stateFilter)
                queryParams.push(`state=${stateFilter}`);

              if (FcityFilter)
                queryParams.push(`city=${FcityFilter}`);

              if (FnameFilter)
                queryParams.push(`name=${FnameFilter}`);

              if (categFilter)
                queryParams.push(`categs=${categFilter}`);

              queryParams = queryParams.join('&');

              let newOngs = [];
              let pagesQuery;

              if (queryParams)
                pagesQuery = `&page=${currentPage}`;
              else
                pagesQuery = `page=${currentPage}`;

              const ongsResponse = await api.get(`/ongs?${queryParams}${pagesQuery}`);

              newOngs = [...ongsResponse.data]

              if (newOngs.length < ONGSPERPAGE && ongsData.pagesVector.length - 1 > currentPageIndex) {
                currentPageIndex++
                currentPage = ongsData.pagesVector[currentPageIndex];
                let pagesQuery;
                if (queryParams)
                  pagesQuery = `&page=${currentPage}`;
                else
                  pagesQuery = `page=${currentPage}`;
                const ongsComplementResponse = await api.get(`/ongs?${queryParams}${pagesQuery}`);
                newOngs = [...newOngs, ...ongsComplementResponse.data]
              }
              const newOngsData = { ...ongsData }
              newOngsData.currentPageIndex = currentPageIndex;
              newOngsData.ongs = [...newOngsData.ongs, ...newOngs];
              setOngsData(newOngsData);
            } catch (err) {
              console.warn(err);
            }
          }
          addNewOngs();
        }
      }
    }

    window.addEventListener('scroll', updateOngs);

    return () => {
      window.removeEventListener('scroll', updateOngs);
    }

  }, [FcityFilter, FnameFilter, ongsData, stateFilter, categFilter]);

  useEffect(() => {
    api.get('categ').then((categNamesResponse) => {
      setCategs(categNamesResponse.data);
    });
  }, [])

  const ongs = ongsData.ongs.map(function (ong) {
    return (
      <Card key={ong._id} ong={ong}/>
    );
  });

  function handleOnChangeState(state) {
    setStateFilter(state);
  }

  function handleOnChangeCateg(categ) {
    if (categ !== '') setCategFilter([categ]);
    else setCategFilter();
  }

  function handleOnChangeCity(city) {
    setCityFilter(city.target.value);
  }

  function handleOnChangeName(name) {
    setNameFilter(name.target.value);
  }

  function handleClickFilter() {
    setActiveFilter(!activeFilter);
  }

  function handleCity(){
    setFcityFilter(cityFilter);
  }

  function handleName(){
    setFnameFilter(nameFilter)
  }

  return (
    <div className="page-wrapper">
      <div className="wrapper wrapper--w960">
        <div className="card card-5">
          <div className="header text-center d-flex flex-wrap justify-content-between">
            <img src="logo cpe.png" className="logo" alt="Logo"></img>
            <h2 className="title d-flex align-items-center">Bem Conectado</h2>
            <Link className=" redondo botaoCadastrar" to="/register" >
              Cadastre sua instituição
            </Link>
          </div>
          <div className="searchBar d-flex flex-wrap">
            <button className="btn1 redondo btn--blue m-2 mr-4 justify-content-end align-self-center" onClick={handleClickFilter} type="submit">
              <FaFilter />
              &nbsp;&nbsp;&nbsp;FILTRO
            </button>

            <div className="col-12" style={{ display: (activeFilter ? "block" : "none") }}>
              <p>Selecione o estado: </p>
              <SelectState className="input--style-5 selectStates col-12 mb-2" onChange={handleOnChangeState} nullable={true} />
              <p>Digite o nome da cidade: </p>
              <div className="d-flex">
              <input className="input--style-6" type='text' onChange={handleOnChangeCity}></input><button className="btn1 btn--blue" onClick={handleCity}><FaSearch/></button>
              </div>
              <p>Digite o nome da instituição: </p>
              <div className="d-flex">
              <input className="input--style-6" type='text' onChange={handleOnChangeName}></input><button className="btn1 btn--blue" onClick={handleName}><FaSearch/></button>
              </div>
              <p>Selecione a categoria: </p>
              <CategSelector className="input--style-5 selectStates col-12 mb-2" onChange={handleOnChangeCateg} categNames={categs} />
            </div>
          </div>

          <div className="card-body d-flex flex-wrap justify-content-center">
            {loader && (
                <ClipLoader
                  size={150}
                  color={"#123abc"}
                  loading={loader}
                />
              )
            }
            {ongs}
          </div>
        </div>
      </div>
    </div>
  );
}

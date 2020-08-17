import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import Card from "./Card";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import SelectState from "../../components/SelectStates";
import { FaFilter, FaHome, FaSearch } from "react-icons/fa";
import CategSelector from "../../components/Categ/CategSelector";
import ClipLoader from "react-spinners/ClipLoader";

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export default function List(props) {
  const history = useHistory();

  const ONGSPERPAGE = 10;

  const filters = useRef({});
  const [activeFilter, setActiveFilter] = useState(false);
  const [monthViews, setMonthViews] = useState({});
  const [loading, setLoading] = useState(true);
  const [categs, setCategs] = useState([]);

  const [ongsData, setOngsData] = useState({
    pagesVector: [],
    ongs: [],
    currentPageIndex: -1,
  });

  function buildQueryParams(extraParamsVector) {
    let queryParams = [];
    Object.keys(filters.current).forEach((key) => {
      queryParams.push(`${key}=${filters.current[key]}`);
    });

    if (extraParamsVector) queryParams = [...queryParams, ...extraParamsVector];

    return queryParams.join("&");
  }

  async function generateShufflePages() {
    let queryParams = buildQueryParams();

    const totalCountResponse = await api.get(`/ongsCount?${queryParams}`);
    const totalCount = totalCountResponse.headers["x-total-count"];

    const pagesVector = [];
    const pages = Math.ceil(totalCount / ONGSPERPAGE);

    for (let i = 1; i <= pages; i++) pagesVector.push(i);

    shuffle(pagesVector);

    return { pagesVector, currentPageIndex: -1 };
  }

  async function loadNextPage(newOngsData) {

    async function getOngs(page) {
      const queryParams = buildQueryParams([`page=${page}`]);
  
      const ongsResponse = await api.get(`/ongs?${queryParams}`);
      return ongsResponse.data;
    }

    let { currentPageIndex, pagesVector } = newOngsData;

    if (currentPageIndex + 1 < pagesVector.length) {
      currentPageIndex++;

      let currentPage = pagesVector[currentPageIndex];
      let newOngs = await getOngs(currentPage);
      shuffle(newOngs); 
      /**
       * Se a requisição retornar menos entidades que a quantidade
       * minima de entidades por página -> pegue a próxima página
       */
      if (
        newOngs.length < ONGSPERPAGE &&
        pagesVector.length - 1 >= currentPageIndex + 1 // Se existir a próxima página
      ) {
        currentPageIndex++;
        currentPage = pagesVector[currentPageIndex];
        const extra = await getOngs(currentPage);
        shuffle(extra); 
        newOngs = [...newOngs, ...extra];
      }

      let ongs;

      if (newOngsData.ongs) ongs = [...newOngsData.ongs, ...newOngs];
      else ongs = newOngs;

      return {
        ongs,
        currentPageIndex,
        pagesVector,
      };
    } else
      return {
        ongs: newOngsData.ongs,
        currentPageIndex,
        pagesVector,
      };
  }

  function newSearch() {
    setLoading(true);
    generateShufflePages()
      .then(loadNextPage)
      .then(setOngsData)
      .catch((error) => console.error(error));
    setLoading(false);
  }

  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        //bottom reached
        loadNextPage(ongsData)
          .then(setOngsData)
          .catch((error) => console.error(error));
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ongsData]);

  useEffect(() => {
    newSearch();

    api.get("monthViews").then((monthViews) => {
      setMonthViews(monthViews.data);
    });

    api.get("categ").then((categNamesResponse) => {
      setCategs(categNamesResponse.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOnChangeFilter(event) {
    const { name, value, type } = event.target;
    const newFilters = { ...filters.current };
    if (value !== "--" && value !== undefined && value !== "")
      newFilters[name] = value;
    else delete newFilters[name];

    filters.current = newFilters;

    if (type !== "text") newSearch();
  }

  function handleClickFilter() {
    setActiveFilter(!activeFilter);
  }

  return (
    <div className="page-wrapper">
      <div className="wrapper wrapper-width">
        <div className="card card-5">
          <div className="Header">
            <button
              className="btn1 redondo btn--yellow m-2 mr-4 justify-content-end align-self-start"
              onClick={() => {
                history.push("/");
              }}
            >
              <FaHome />
            </button>
            <img src="./logos/8.png" className="logo" alt="Logo"></img>
            <Link className=" redondo botaoCadastrar" to="/register">
              Cadastre sua instituição
            </Link>
          </div>
          <div className="searchBar d-flex flex-wrap">
            <button
              className="btn1 redondo btn--blue m-2 mr-4 justify-content-end align-self-center"
              onClick={handleClickFilter}
              type="submit"
            >
              <FaFilter />
              &nbsp;&nbsp;&nbsp;FILTRO
            </button>

            <div
              className="col-12"
              style={{ display: activeFilter ? "block" : "none" }}
            >
              <p>Selecione o estado: </p>
              <SelectState
                className="input--style-5 selectStates col-12 mb-2"
                name="state"
                onChange={handleOnChangeFilter}
                nullable={true}
              />
              <p>Digite o nome da cidade: </p>
              <div className="d-flex">
                <input
                  className="input--style-6"
                  type="text"
                  name="city"
                  onChange={handleOnChangeFilter}
                />
                <button
                  className="radiusRight btn1 btn--blue"
                  onClick={newSearch}
                >
                  <FaSearch />
                </button>
              </div>
              <p>Digite o nome da instituição: </p>
              <div className="d-flex">
                <input
                  className="input--style-6"
                  type="text"
                  name="name"
                  onChange={handleOnChangeFilter}
                />
                <button
                  className="radiusRight btn1 btn--blue"
                  onClick={newSearch}
                >
                  <FaSearch />
                </button>
              </div>
              <p>Selecione a categoria: </p>
              <CategSelector
                className="input--style-5 selectStates col-12 mb-2"
                onChange={handleOnChangeFilter}
                name={categs}
                categNames={categs}
              />
            </div>
          </div>

          <div className="card-body d-flex flex-wrap justify-content-center">
            {loading ? (
              <ClipLoader size={150} color={"#123abc"} loading={true} />
            ) : (
              ongsData.ongs?.map((ong) => {
                let count = monthViews[ong._id] ? monthViews[ong._id].count : 0;

                return <Card key={ong._id} ong={ong} count={count} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

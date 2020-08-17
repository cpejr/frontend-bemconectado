import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@material-ui/core";
import api from "../../services/api";

import { MdLocationOn } from "react-icons/md";
import { IconContext } from "react-icons";
import { BsEyeFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles({
  root: {
    position: "relative",
    margin: "10px",
    "margin-bottom": "15px",
    maxWidth: 320,
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
  },
  media: {
    position: "relative",
    height: 140,
    justifyContent: "center",
    display: "flex",
    alignItens: "center",
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
  },
  actionArea: {
    flexDirection: "column",
    flexGrow: 1,
  },
  views: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default function OngCard(props) {
  const ong = props.ong;
  const [count, setCount] = useState(0);
  const [categs, setCategs] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (props.count) setCount(props.count);
  }, [props.count]);

  const history = useHistory();

  useEffect(() => {
    api.get(`categ/${ong._id}`).then((resultVector) => {
      if (resultVector) {
        setCategs(resultVector.data);
      }
    });
  }, [ong]);

  async function handleClick() {
    await api.post(`/registerAcess/${ong._id}`);
    history.push({
      pathname: "/ongshow",
      state: {
        ong: ong,
        categs: categs,
        count: count,
      },
    });
  }

  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ maxHeight: "600px" }}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => handleClick()}
      >
        <CardMedia className={classes.media}>
          <div className={classes.loader}>
            <ClipLoader size={50} color={"#123abc"} loading={!imgLoaded} />
          </div>
          <img
            src={`https://drive.google.com/uc?id=${ong.imageSrc}`}
            alt="logo"
            onLoad={() => {
              setImgLoaded(true);
            }}
            style={{ width: "auto", height: "140px" }}
          />
        </CardMedia>

        <CardContent style={{ maxHeight: "300px", overflow: "hidden" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {ong.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ong.description}
          </Typography>
        </CardContent>
        <CardContent>
          <IconContext.Provider value={{ color: "#444", size: "1.2em" }}>
            <div className="locationContainer">
              <MdLocationOn />
              <Typography variant="caption" component="h2">
                {ong.state}, {ong.city}
              </Typography>
            </div>
            {categs &&
              categs.map((name) => {
                return (
                  <Chip
                    key={name}
                    size="small"
                    label={name}
                    style={{ marginRight: 5 }}
                  />
                );
              })}
          </IconContext.Provider>
        </CardContent>
      </CardActionArea>

      <CardActions className="mt-auto">
        <div
          style={{ borderRadius: "400px" }}
          className="btn btn btn-warning mx-auto"
          onClick={handleClick}
        >
          Saiba mais
        </div>
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <IconContext.Provider value={{ color: "#444", size: "1.2em" }}>
            <BsEyeFill />
          </IconContext.Provider>
          {count}
        </div>
      </CardActions>
    </Card>
  );
}

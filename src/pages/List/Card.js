import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Chip } from '@material-ui/core';
import api from '../../services/api';

import { MdLocationOn } from "react-icons/md";
import { IconContext } from "react-icons";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles({
  root: {
    margin: '10px',
    'margin-bottom': '15px',
    maxWidth: 320,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    position: 'relative',
    height: 140,
    justifyContent: 'center',
    display: 'flex',
    alignItens: 'center',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  }
});

export default function OngCard(props) {
  let ong = props.ong;
  const [categs, setCategs] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    api.get(`categ/${ong._id}`).then((resultVector) => {
      if (resultVector) {
        setCategs(resultVector.data);
      }
    });
  }, [ong]);


  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media}>
          <div className={classes.loader}>
            <ClipLoader
              size={50}
              color={"#123abc"}
              loading={!imgLoaded}
            />
          </div>
          <img src={`https://drive.google.com/uc?id=${ong.imageSrc}`} alt='logo' onLoad={() => { setImgLoaded(true) }} style={{ width: 'auto', height: '140px' }} />
        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {ong.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ong.description}
          </Typography>
        </CardContent>
        <CardContent>
          <IconContext.Provider value={{ color: "#444", size: "1.2em" }}>
            <div className='locationContainer'>
              <MdLocationOn />
              <Typography variant="caption" component="h2" >
                {ong.state}, {ong.city}
              </Typography>
            </div>
            {
              categs && categs.map((name) => {
                return (
                  <Chip key={name} size="small" label={name} style={{ marginRight: 5 }} />
                )
              })
            }
          </IconContext.Provider>
        </CardContent>
      </CardActionArea>

      <CardActions className="mt-auto">
        <Link style={{ "border-radius": "400px" }}
          className="btn btn btn-warning mx-auto" to={{
            pathname: '/ongshow',
            state: {
              ong: ong,
              categs: categs
            }
          }}>Saiba mais</Link>
      </CardActions>
    </Card>
  )

}
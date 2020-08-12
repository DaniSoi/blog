import React from 'react';
import { history } from '../../history';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import img from '../../assets/imgs/lost.jpg';
import { useDispatch } from "react-redux";
import { changeFeedViewAction } from "../../redux/actions/actions";
import views from "../../redux/actions/feed-views";

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    background: 'white'
  },
  img: {
    height: '60vh',
    width: '100vw',
    backgroundImage: `url(${img})`,
    // backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    // position: "absolute",
    // top: '50%',
    // left: '50%',
    // margin: 'auto'
  },
  content: {
    marginTop: '15vh',
    padding: '0 10vw'
  },
  text: {
    marginTop: '3vh',
    whiteSpace: 'pre-wrap',
  },
  buttonContainer: {
    marginTop: '3vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Error500 () {
  const classes = useStyles();
  const storeDispatch = useDispatch();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Typography variant="h2">
          {"Oops! Sorry about that..."}
        </Typography>
        <Typography variant="h4" className={classes.text} >
          {"Our team is working on fixing this problem,\nPlease try again later."}
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button variant="contained"
                  color="primary"
                  onClick={() => history.push('/')}//storeDispatch(changeFeedViewAction(views.FEED))}
          >
            return
          </Button>
        </Box>
      </Box>
      {/*<Box className={classes.imgs}/>*/}
    </Box>
  );
};


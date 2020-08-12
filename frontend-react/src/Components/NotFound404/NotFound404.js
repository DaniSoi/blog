import React from 'react';
import { history } from '../../history';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import img from '../../assets/imgs/lost.jpg';
import routes from "../../routes";

const useStyles = makeStyles(() => ({
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
    height: '40vh',
    width: '70vw',
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
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

export function NotFound404 () {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Typography variant="h2">
          {"Not Found! 404"}
        </Typography>
        <Typography variant="h4" className={classes.text} >
          {"We can't seem to find the page you're looking for"}
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button variant="contained"
                  color="primary"
                  onClick={() => history.push('/')}
          >
            go home
          </Button>
        </Box>
      </Box>
      <Box className={classes.img}/>
    </Box>
  );
}


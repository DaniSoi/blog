import useLoadImage from "../../hooks/useLoadImage";
import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles(theme => ({
  imgContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    margin: 'auto',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.between('sm', 'xl')]: {
      height: '50%',
      width: '90%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '80%',
      width: '90%',
    }
  }
}));

export default function LazyBackgroundImage ({src, imgClass, imgContainerClass, skeletonHeight}) {
  const loadedSrc = useLoadImage(src);
  const classes = useStyles();

  return (
    <Box className={imgContainerClass || classes.imgContainer}>
      {loadedSrc ?
        <Box className={imgClass || classes.img}
             style={{backgroundImage: `url(${loadedSrc})` }}/>
        :
        <Box className={imgClass || classes.img}>
          <Skeleton height={skeletonHeight || 300}/>
        </Box>
      }
    </Box>
  );
}
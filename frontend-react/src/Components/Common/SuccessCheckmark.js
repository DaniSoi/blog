import { Box, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Checkmark } from "react-checkmark";

const useStyles = makeStyles(() => ({
  centerContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    marginTop: '2vh',
    maxWidth: '600px'
  }
}));

export default function SuccessCheckmark ({
                                            text,
                                            callback = () => {},
                                            containerClass,
                                            textClass,
                                            markSize = "large",
                                            children
                                          }) {
  const classes = useStyles();

  setTimeout(() => {
    callback();
  }, 2000);

  return (
    <Box className={containerClass || classes.centerContainer}>
      <Box>
        <Checkmark size={markSize}/>
        <Typography className={textClass || classes.successContent}>
          {text}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}

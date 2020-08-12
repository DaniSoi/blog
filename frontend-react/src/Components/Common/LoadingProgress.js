import { CircularProgress } from "@material-ui/core";
import React from "react";

const LoadingProgress = ({
                            containerClass = "circle-container center-container",
                            circleClass = "circle"
                          }) =>
  <div className={containerClass}>
    <CircularProgress className={circleClass}/>
  </div>
;

export default LoadingProgress;

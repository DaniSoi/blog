import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { changeFeedViewAction } from "../redux/actions/actions";

export function withChangeViewState (Component, targetView) {
  return props => {
    const storeDispatch = useDispatch();

    useLayoutEffect(() => {
      storeDispatch(changeFeedViewAction(targetView));
    }, [storeDispatch, targetView]);

    return <Component {...props}/>;
  }
}

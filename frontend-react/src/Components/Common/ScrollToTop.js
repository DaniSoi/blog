import React, { Fragment, useEffect } from "react";
import { history } from "../../history";

export default function ScrollToTop ({ children }) {
  useEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0));
    return unlisten;
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}

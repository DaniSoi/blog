import { Header } from "../Header/Header";
import React, {Fragment} from "react";
import { Footer } from "../Footer/Footer";

export const PageTemplate = ({children}) =>
  <Fragment>
    <Header/>
    <main className="main">
    {children}
    </main>
    <Footer/>
  </Fragment>
;

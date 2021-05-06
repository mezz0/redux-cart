import React, { useEffect } from "react";
import { Switch } from "react-router";
import { Route, withRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Main from "./pages/Main";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

import { fetchData } from "./store/actions/productsActions";
import { connect } from "react-redux";

import "./App.css";

const App: React.FC<WithAppProps> = (props) => {
  const { location } = props;
  const { fetchData } = props; // main fetch function

  useEffect(() => {
    const endpoint =
      "https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json";
    fetchData(endpoint);
    // eslint-disable-next-line
  });

  return (
    <div className="App">
      <HelmetProvider>
        <Navbar />
        <Switch location={location}>
          <Route exact path="/" component={Main} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </HelmetProvider>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (url: any) => dispatch(fetchData(url)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));

interface WithAppProps {
  location: any;
  fetchData: (val: any) => void;
}

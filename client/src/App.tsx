import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Routes";
import { Template } from "./components/MainComponents";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";

const App = (props: any) => {
  return (
    <Router>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </Router>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

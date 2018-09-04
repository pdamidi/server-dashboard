import React, { Component } from "react";
import Sidebar from "./components/sidebar/index";
import Servers from "./components/servers/index";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="main">
        <Sidebar />
        <Servers />
      </div>
    );
  }
}

export default App;

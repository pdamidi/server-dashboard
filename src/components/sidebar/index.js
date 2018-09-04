import React from "react";
import Sidebar from "./sidebar";
import { AppContext } from "../../contexts/AppContext";

const SidebarConsumer = props => (
  <AppContext.Consumer>
    {({ addServer, removeServer, servers }) => (
      <Sidebar
        {...props}
        addServer={addServer}
        removeServer={removeServer}
        totalServers={servers.length}
      />
    )}
  </AppContext.Consumer>
);

export default SidebarConsumer;

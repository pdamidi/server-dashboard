import React from "react";
import Servers from "./servers";
import { AppContext } from "../../contexts/AppContext";

const ServersConsumer = props => (
  <AppContext.Consumer>
    {({
      servers,
      availableApps,
      lastServer,
      reOrg,
      reOrg2,
      latestAppServer,
      addApp
    }) => (
      <Servers
        {...props}
        servers={servers}
        availableApps={availableApps}
        lastServer={lastServer}
        reOrg={reOrg}
        addApp={addApp}
      />
    )}
  </AppContext.Consumer>
);

export default ServersConsumer;

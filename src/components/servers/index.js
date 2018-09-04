import React from "react";
import Servers from "./servers";
import { AppContext } from "../../contexts/AppContext";

const ServersConsumer = props => (
  <AppContext.Consumer>
    {({ servers, availableApps }) => (
      <Servers {...props} servers={servers} availableApps={availableApps} />
    )}
  </AppContext.Consumer>
);

export default ServersConsumer;

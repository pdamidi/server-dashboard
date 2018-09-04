import React from "react";
import AvailableApps from "./available-apps";
import { AppContext } from "../../contexts/AppContext";

const AvailableAppsConsumer = props => (
  <AppContext.Consumer>
    {({ availableApps, addApp, deleteApp, latestAppServer }) => (
      <AvailableApps
        {...props}
        availableApps={availableApps}
        addApp={addApp}
        deleteApp={deleteApp}
        latestAppServer={latestAppServer}
      />
    )}
  </AppContext.Consumer>
);

export default AvailableAppsConsumer;

import React, { Component } from "react";

export const AppContext = React.createContext();

const availableApps = [
  {
    id: 1,
    name: "Hadoop",
    code: "Hd"
  },
  {
    id: 2,
    name: "Rails",
    code: "Ra"
  },
  {
    id: 3,
    name: "Chronos",
    code: "Ch"
  },
  {
    id: 4,
    name: "Strom",
    code: "St"
  },
  {
    id: 5,
    name: "Spark",
    code: "Sp"
  }
];

//cluster starts with 4 servers
const servers = [
  {
    id: 1,
    apps: []
  },
  {
    id: 2,
    apps: []
  },
  {
    id: 3,
    apps: []
  },
  {
    id: 4,
    apps: []
  }
];

export class AppProvider extends Component {
  state = {
    availableApps: availableApps,
    servers: servers,
    latestAppServer: {},
    lastServer: null
  };

  addServer = index => {
    this.setState(prevState => ({
      servers: prevState.servers.concat([
        {
          id: prevState.servers.length + 1,
          apps: []
        }
      ])
    }));
  };

  removeServer = () => {
    const lastServer = this.state.servers.slice(-1)[0];

    if (!lastServer) return;

    lastServer.apps.forEach(app => {
      const newState = this.state.latestAppServer[app.id].filter(
        id => id !== lastServer.id
      );

      this.setState(prevState => ({
        latestAppServer: { ...prevState.latestAppServer, [app.id]: newState }
      }));
    });

    this.setState({
      servers: this.state.servers.slice(0, -1),
      lastServer: lastServer
    });
  };

  getIndex = servers => {
    // getting the index of the server that has zero apps
    const fisrtIndex = servers.findIndex(server => server.apps.length === 0);
    if (fisrtIndex !== -1) {
      return fisrtIndex;
    }
    // getting the index of the server that has one apps
    const secondIndex = servers.findIndex(server => server.apps.length === 1);
    if (secondIndex !== -1) {
      return secondIndex;
    }

    // when all the servers have two apps running on it
    return -1;
  };

  setLatestAppServer = (appId, currentIndex) => {
    this.setState(prevState => ({
      latestAppServer: {
        ...prevState.latestAppServer,
        [appId]: prevState.latestAppServer[appId]
          ? [...prevState.latestAppServer[appId], currentIndex]
          : [currentIndex]
      }
    }));
  };

  deleteLatestAppServer = appObj => {
    this.setState(prevState => ({
      latestAppServer: {
        ...prevState.latestAppServer,
        [appObj.id]: prevState.latestAppServer[appObj.id].slice(0, -1)
      }
    }));
  };

  reOrg = apps => {
    if (apps.length || this.state.lastServer.apps.length) {
      this.addApp(apps[0]);
      this.setState({
        lastServer: {
          ...this.state.lastServer,
          apps: this.state.lastServer.apps.slice(1)
        }
      });
    }
  };

  addApp = appObj => {
    const serverIndex = this.getIndex(this.state.servers);
    //don't add more apps when there aren't any servers

    if (serverIndex === -1 || !appObj) return;

    const { servers } = this.state;
    const newAppObj = [appObj, ...servers[serverIndex].apps];

    this.setState(
      {
        servers: [
          ...servers.slice(0, serverIndex),
          { ...servers[serverIndex], apps: newAppObj },
          ...servers.slice(serverIndex + 1)
        ]
      },
      this.setLatestAppServer(appObj.id, servers[serverIndex].id)
    );
  };

  deleteApp = appObj => {
    const { latestAppServer } = this.state;
    //The latest server is always a the end of the array
    const latestAppServerId = latestAppServer[appObj.id]
      ? latestAppServer[appObj.id].slice(-1)[0]
      : null;

    //when no servers are there any more
    if (!latestAppServerId) return;

    const index = latestAppServerId - 1;

    const latestServer = this.state.servers.find(
      s => s.id === latestAppServerId
    );

    if (!latestServer) {
      return;
    }

    //find the first server that matches; since the latest apps are added to front of the list
    const appIndex = latestServer.apps.findIndex(app => app.id === appObj.id);

    const newAppsObj = [
      ...latestServer.apps.slice(0, appIndex),
      ...latestServer.apps.slice(appIndex + 1)
    ];

    this.setState(prevState => {
      const newState = [
        ...prevState.servers.slice(0, index),
        { ...latestServer, apps: newAppsObj },
        ...prevState.servers.slice(index + 1)
      ];

      return {
        servers: newState
      };
    });
    this.deleteLatestAppServer(appObj);
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          addServer: this.addServer,
          removeServer: this.removeServer,
          addApp: this.addApp,
          deleteApp: this.deleteApp,
          reOrg: this.reOrg
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

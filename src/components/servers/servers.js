import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./servers.scss";

const ServerApps = ({ serverApps }) => {
  if (!serverApps.length) return null;
  return (
    <Fragment>
      {serverApps.map((app, index) => {
        const appsClassName = classNames("app-box", [`app-box-${app.id}`]);
        return (
          <div key={index} className={appsClassName}>
            <div className="app-code">{app.code}</div>
            <div className="app-name">{app.name}</div>
          </div>
        );
      })}
    </Fragment>
  );
};

ServerApps.propTypes = {
  serverApps: PropTypes.array,
  availableApps: PropTypes.array
};

class Servers extends Component {
  static propTypes = {
    servers: PropTypes.array.isRequired,
    availableApps: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const node = this.myRef.current;
    this.shouldScrollBottom =
      node.scrollTop + node.clientHeight + 150 >= node.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (this.shouldScrollBottom) {
      const node = this.myRef.current;
      node.scrollTop = node.scrollHeight;
    }
    if (prevProps.servers.length > this.props.servers.length) {
      //kill server
      this.props.reOrg(this.props.lastServer.apps);
    }

    if (
      prevProps.lastServer &&
      prevProps.lastServer !== this.props.lastServer &&
      prevProps.lastServer.apps.length !== this.props.lastServer.apps.length
    ) {
      this.props.addApp(this.props.lastServer.apps[0]);
    }
  }

  render() {
    const { servers, availableApps } = this.props;
    return (
      <div className="servers">
        <div className="servers-header">Server Canvas</div>
        <div ref={this.myRef} className="servers-canvas-wrapper">
          <div className="servers-canvas">
            {servers.map(server => (
              <div key={server.id} className="server">
                <ServerApps
                  serverApps={server.apps}
                  availableApps={availableApps}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Servers;

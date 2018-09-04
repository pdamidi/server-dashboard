import React, { Component } from "react";
import PropTypes from "prop-types";
import AddButton from "../controls/add-button";
import DeleteButton from "../controls/delete-button";
import classNames from "classnames";
import "./available-apps.scss";

class AvailableApps extends Component {
  static propTypes = {
    availableApps: PropTypes.array.isRequired,
    addApp: PropTypes.func.isRequired,
    deleteApp: PropTypes.func.isRequired,
    latestAppServer: PropTypes.object.isRequired
  };

  addApp = appDetails => () => this.props.addApp(appDetails);
  deleteApp = appDetails => () => this.props.deleteApp(appDetails);

  render() {
    const { availableApps, latestAppServer } = this.props;

    return (
      <ul className="available-apps">
        {availableApps.map(app => {
          const appsClassName = classNames("available-app", [
            `available-app-${app.id}`
          ]);
          return (
            <li key={app.id} className={appsClassName}>
              {app.name}
              <div className="available-apps-controls">
                <DeleteButton
                  small
                  deleteHandler={this.deleteApp(app)}
                  disabled={
                    !latestAppServer[app.id] || !latestAppServer[app.id].length
                  }
                />
                <AddButton small addHandler={this.addApp(app)} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default AvailableApps;

import React, { Component } from "react";
import AvailableApps from "../available-apps/index";
import PropTypes from "prop-types";
import AddButton from "../controls/add-button";
import DeleteButton from "../controls/delete-button";
import classNames from "classnames";
import "./sidebar.scss";

class Sidebar extends Component {
  static propTypes = {
    addServer: PropTypes.func.isRequired,
    removeServer: PropTypes.func.isRequired,
    totalServers: PropTypes.number.isRequired
  };

  render() {
    const { addServer, removeServer, totalServers } = this.props;
    const deleteClassName = classNames("remove-server-text", {
      disable: !totalServers
    });

    return (
      <div className="sidebar">
        <div className="sidebar-controls">
          <div className="add-server">
            <AddButton addHandler={addServer} />
            <div className="add-server-text">Add Server</div>
          </div>
          <div className="remove-server">
            <DeleteButton
              disabled={!totalServers}
              deleteHandler={removeServer}
            />
            <div className={deleteClassName}>Destroy</div>
          </div>
        </div>
        <AvailableApps />
      </div>
    );
  }
}

export default Sidebar;

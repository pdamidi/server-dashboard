import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./controls.scss";

const RemoveButton = ({ small, disabled, deleteHandler }) => {
  const iconClassName = classNames("delete-button", {
    small: small,
    disable: disabled
  });
  return (
    <div className={iconClassName} onClick={deleteHandler}>
      &#175;
    </div>
  );
};

RemoveButton.propTypes = {
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  deleteHandler: PropTypes.func.isRequired
};

export default RemoveButton;

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./controls.scss";

const AddButton = ({ small, addHandler }) => {
  const iconClassName = classNames("add-button", {
    small: small
  });
  return (
    <div className={iconClassName} onClick={addHandler}>
      &#43;
    </div>
  );
};

AddButton.propTypes = {
  small: PropTypes.bool,
  addHandler: PropTypes.func.isRequired
};

export default AddButton;

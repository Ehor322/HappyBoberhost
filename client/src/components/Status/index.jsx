import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import "./status.scss";

const Status = ({ online, fullname }) => (

  <div className="chat__dialog-header">
    <div />
    <div className="chat__dialog-header-center">
      <b className="chat__dialog-header-username">{fullname}</b>
      <div className="chat__dialog-header-status">
        <span className={classNames("status", { "status status--online": online })}>{ online ? 'online' : 'offline'}</span>
      </div>
    </div>
    <div />
  </div>

);

Status.propTypes = {
  online: PropTypes.bool,
};

export default Status;
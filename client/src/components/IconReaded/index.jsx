import React from "react";
import PropTypes from "prop-types";
import readedSvg from "../../img/readed.svg";
import noreadedSvg from "../../img/noreaded.svg";

const IconReaded = ({ isMe, isReaded }) => (
    (isMe && (isReaded ? (<img className="message__icon-readed" src={readedSvg} alt="Readed icon" />) :
        (<img className="message__icon-readed message__icon-readed--no" src={noreadedSvg} alt="No readed icon" />)
    ))
);

IconReaded.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool
  };

export default IconReaded;
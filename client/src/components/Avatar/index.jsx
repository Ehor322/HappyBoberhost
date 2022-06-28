import React from "react";
import PropTypes from "prop-types";

import { generateAvatarFromHash } from '../../utils/helper'

import "./avatar.scss";

const Avatar = ({ user }) => {
  if (user.photo) {
    return (<img className="avatar" src={ user.photo } alt={`Avatar ${user.fullname}`} />);
  } else {
    const { color, colorLighten } = generateAvatarFromHash(user._id);
    const firstChar = user.fullname[0].toUpperCase();
    return (
      <div style={{background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}} className="avatar avatar--symbol">
        {firstChar}
      </div>
    );
  } 
};

Avatar.propTypes = {
  className: PropTypes.string
};

export default Avatar;
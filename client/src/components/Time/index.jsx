import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { format, isToday, isThisYear } from 'date-fns'

const getMessageTime = createdAt => {
    if (isToday(new Date(createdAt))) {
      return format(new Date(createdAt), 'HH:mm');
    } else if (isThisYear(new Date(createdAt))) {
      return format(new Date(createdAt), 'd MMM');
    } else {
      return format(new Date(createdAt), 'dd.MM.yyyy');
    }
};
  
const Time = ({ date }) => (
    <Fragment>
        {getMessageTime(new Date(date))}
    </Fragment>
);

Time.propTypes = {
    date: PropTypes.string
};


export default Time;
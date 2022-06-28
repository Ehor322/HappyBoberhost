import React from "react";
import classNames from "classnames";
import { IconReaded, Avatar } from "../";
import { Link } from 'react-router-dom';
import { format, isToday, isThisYear, isThisWeek } from 'date-fns'

const getMessageTime = createdAt => {
  if (isToday(new Date(createdAt))) {
    return format(new Date(createdAt), 'HH:mm');
  } else if (isThisWeek(new Date(createdAt))) {
    return format(new Date(createdAt), 'iii');
  } else if (isThisYear(new Date(createdAt))) {
    return format(new Date(createdAt), 'd MMM');
  } else {
    return format(new Date(createdAt), 'dd.MM.yyyy');
  }
};

const renderLastMessage = (message, userId) => {
  let text = '';
  if (!message.text && message.attachments.length) {
    text = 'attached file';
  } else if(message.text) {
    text = message.text;
  } else {
    text = 'no messages';
  }

  return `${message.user._id === userId ? 'You: ' : ''}${text}`;
};

const DialogItem = ({ _id, userId, author, partner, isMe, currentDialogId, lastMessage }) => (
  
  <Link to={`/dialog/${_id}`}>
    <div className={classNames('dialogs__item', { 'dialogs__item--online': partner.isOnline,'dialogs__item--selected': currentDialogId === _id })} >
      <div className="dialogs__item-avatar">
        <Avatar user= { isMe ? partner : author }/>
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>{ isMe ? partner.fullname : author.fullname }</b>
          <span>{ getMessageTime(lastMessage.createdAt) }</span>
        </div>
        <div className="dialogs__item-info-bottom">
          <p>
            { renderLastMessage(lastMessage, userId) }
          </p>
          {lastMessage.user._id === userId ? <IconReaded isMe={isMe || !isMe} isReaded={lastMessage.readed} /> : lastMessage.readed ? '' : <div className="dialogs__item-info-bottom-count">new</div>}
        </div>
      </div>
    </div>
  </Link>
);

export default DialogItem;
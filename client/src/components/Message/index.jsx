import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { EyeOutlined } from '@ant-design/icons';
import { Time, IconReaded, Avatar } from "../";

import "./message.scss";

const Message = ({ user, text, createdAt, isMe, readed, attachments, isTyping, setPreviewImage }) => (
    <div className={classNames("message", {"message--isme" : isMe, "message--is-typing" : isTyping,"message--image" : attachments && attachments.length === 1 && !text}) }>
        <div className="message__content">
            <IconReaded isMe={isMe} isReaded={readed} />
            <div className="message__avatar">
                <Avatar user={ user }/>
                {createdAt && <span className="message__date">
                    <Time date={ createdAt }/>
                    </span>}
            </div>        
            <div className="message__info">
                {(text || isTyping) && (<div className="message__bubble">
                    {text && <p className="message__text">{text}</p>}
                    {isTyping && (<div className="message__typing">
                        <span />
                        <span />
                        <span />
                    </div>)}
                </div>)}
                
                {attachments && (
                    <div className="message__attachments"> 
                        {attachments.map((item, index) => (
                        <div key={index} onClick={() => setPreviewImage(item.url)} className="message__attachments-item">
                            <div className="message__attachments-item-overlay">    
                                <EyeOutlined style={{color: "white", fontSize: 18}}/>
                            </div>
                            <img src={item.url} alt={item.filename} />
                        </div>
                        ))}
                    </div>)}
            </div>
        </div>
        </div>
);

Message.defaultProps = {
    user: {}
};

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool
};


export default Message;
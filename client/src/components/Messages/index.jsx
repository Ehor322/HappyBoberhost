import React from "react";
import { Modal } from 'antd';
import PropTypes from "prop-types";
import { Empty, Spin } from "antd";
import classNames from 'classnames';

import { Message } from "../";

import "./messages.scss";

const Messages = ({ blockRef, isLoading, items, user, previewImage, setPreviewImage, blockHeight, isTyping, partner}) => {
  
  return (<div className="chat__dialog-messages" style={{ "height": `calc(100% - ${blockHeight}px)` }}>
    <div ref={blockRef} className={classNames('messages', { 'messages--loading': isLoading })}>
      {
        isLoading && !user ? (<Spin size="large" tip="Loading..." />) : items && !isLoading ? (items.length > 0 ? items.map(item => <Message key={item._id} {...item} isMe={user._id === item.user._id} setPreviewImage={setPreviewImage} />) : (<Empty description="No messages" />)) : (<Empty description="Open a dialog" />)
      }
      {isTyping && <Message isTyping={true} user={partner} />}
      <Modal visible={!!previewImage} onCancel={() => setPreviewImage(null)} footer={null}>
        <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
      </Modal>
    </div>
  </div>);
};

Messages.propTypes = {
  items: PropTypes.array
};

export default Messages;
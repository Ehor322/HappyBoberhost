import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CameraOutlined, SendOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { UploadField } from '@navjobs/upload'

import { UploadFiles } from "../../components";

import "./chatInput.scss";

const { TextArea } = Input;

const ChatInput = props => {
  const { value, setValue, handleSendMessage, sendMessage, attachments, onSelectFiles, removeAttachment } = props;

  return (
    <Fragment>
      <div className="chat-input">
        <div>
          <TextArea size="large" autoSize={{ minRows: 1, maxRows: 2 }} placeholder="Write a message..." onChange={e => setValue(e.target.value)} onKeyUp={handleSendMessage} value={ value } />
          <div className="chat-input__actions">
            <UploadField
              onFiles={onSelectFiles}
              containerProps={{
                className: "chat-input__actions-upload-btn"
              }}
              uploadProps={{
                accept: ".jpg,.jpeg,.png,.gif,.bmp",
                multiple: "multiple"
              }}
            >
              <Button type="link" shape="circle" icon={<CameraOutlined />} />
            </UploadField>
            <Button onClick={sendMessage} disabled={!value} type="link" shape="circle" icon={<SendOutlined />} />
          </div>
        </div>
        {attachments.length > 0 && <div className="chat-input__attachments">
          <UploadFiles removeAttachment={removeAttachment} attachments={attachments}/>
        </div>}
    </div>
    </Fragment>
  );
};

ChatInput.propTypes = {
  className: PropTypes.string
};

export default ChatInput;
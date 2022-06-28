import React from 'react';
import { TeamOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Input, Form  } from 'antd';
import { Dialogs } from "../../containers";

import './sidebar.scss';

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({ user,visible, messageText, selectedUserId, inputValue, isLoading, users, onShow, onSearch, onClose, onChangeInput, onSelectUser, onChangeTextArea, onModalOk }) => {
    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

    return (
    <div className="chat__sidebar">
    <div className="chat__sidebar-header">
      <div>
        <TeamOutlined className="site-form-item-icon" />
        <span>Messages</span>
      </div>
    </div>
        <div className="chat__sidebar-dialogs">
        <Dialogs userId={user && user._id} />
    </div>
      <Modal title="Create dialog" visible={visible}
        footer={[
          <Button key="back" onClick={onClose}>
            Close
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onModalOk}>
            Create
          </Button>,
        ]}
        >
        <Form className="add-dialog-form">
            <Form.Item label="Input user name">
              <Select
                  showSearch
                  value={inputValue}
                  placeholder="Input user name"
                  style={{width: '100%'}}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSelect={onSelectUser}
                  onSearch={onSearch}
                  onChange={onChangeInput}
                  notFoundContent={null}
              >
                  {options}
              </Select>
            </Form.Item>
            {selectedUserId && (
              <Form.Item label="Input message">
                <TextArea placeholder="Input message" autoSize={{ minRows: 3, maxRows: 10 }} onChange={onChangeTextArea} value={messageText} />
              </Form.Item>)}
        </Form>  
        </Modal>
  </div>
  );
};

Sidebar.defaultProps = {
    users: [],
  };

export default Sidebar;
import React from "react";
import orderBy from "lodash/orderBy";
import { Input, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { DialogItem } from "../";

import './dialogs.scss';

const Dialogs = ({ items, userId, onSearch, inputValue, currentDialogId }) => (
  <div className="dialogs">
    <div className="dialogs__search"><Input addonBefore={<SearchOutlined />} placeholder="Search for correspondence" onChange={e => onSearch(e.target.value)} value={inputValue}/></div>
    {items.length ? orderBy(items, ["created_at"], ["desc"]).map(item => (<DialogItem key={item._id} isMe={item.author._id === userId} userId={userId} currentDialogId={currentDialogId} {...item} />)) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing found"/>}
</div>
);

export default Dialogs;
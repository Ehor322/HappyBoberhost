import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userApi, dialogsApi } from "../utils/api";
import {useParams} from "react-router-dom";

import { Sidebar } from "../components";

const SidebarContainer = ({ user }) => {
    const fullname = useParams().fullname;
    const userid = useParams().userid;
    const adid = useParams().adid;
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState(fullname);
    const [messageText, setMessagaText] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(userid);
    const [closeActive, setCloseActive] = useState(true);
    
    useEffect(() => {
        if (closeActive) {
            if (window.location.href.indexOf("%20") > -1) {
                setVisible(true);
            }
        }
    });

    const onClose = () => {
        setCloseActive(false);
        setVisible(false);
    };

    const onShow = () => {
        setVisible(false);
    };

    const onSearch = value => {
        setIsLoading(true);
        userApi.findUsers(value).then(({ data }) => {
             setUsers(data);
             setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    };

    const onAddDialog = () => {
        dialogsApi.create({partner: selectedUserId,text: messageText, ad: adid}).then(onClose).catch(() => {
            setIsLoading(false);
        });
    };
    
    const handleChangeInput = value => {
        console.log(value);
        setInputValue(value);
    };
    
    const onChangeTextArea = e => {
        setMessagaText(e.target.value);
      };

    const onSelectUser = userId => {
        setSelectedUserId(userId);
      };
    
  return (
        <Sidebar
          user={user}
          inputValue={inputValue}
          visible={visible}
          isLoading={isLoading}
          onClose={onClose}
          onShow={onShow}
          onSearch={onSearch}
          onSelectUser={onSelectUser}
          onModalOk={onAddDialog}
          onChangeTextArea={onChangeTextArea}
          messageText={messageText}
          onChangeInput={handleChangeInput}
          selectedUserId={selectedUserId}
          users={users}
        />
  );
};

export default connect( ({user}) => ({user: user.data}) )(SidebarContainer);
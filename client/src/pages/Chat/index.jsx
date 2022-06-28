import React, { useEffect } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { connect } from 'react-redux';

import { Messages, ChatInput, Status, Sidebar, Ad } from "../../containers";
import { dialogsActions } from '../../redux/actions';
import socket from '../../core/socket'

import './chat.scss';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (<Component {...props} router={{ location, navigate, params }}/>);
  }
  return ComponentWithRouterProp;
}

const Chat = props => {
  const { setCurrentDialogId, user, fetchDialogs, updateReadedStatus } = props;
  useEffect(() => {
     const dialogId = props.router.location.pathname.split('/dialog/').pop();
    setCurrentDialogId(dialogId);
    fetchDialogs();
    socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
    socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
    socket.on('SERVER:MESSAGES_READED', updateReadedStatus);
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
      socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
    }
  }, [props.router.location.pathname]);
  
  
  return (
    <section className="chat__wrapper">
      <div className="chat">
        <Sidebar />
        {user && (
        <div className="chat__dialog">
          <Status/>
            <Ad/>
          <Messages/>
          <div className="chat__dialog-input">
            <ChatInput/>
          </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default withRouter(connect(({ user }) => ({ user: user.data }), dialogsActions,)(Chat));
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Empty } from "antd";
import find from 'lodash/find';

import socket from '../core/socket'
import { Messages as BaseMessages } from '../components';
import { messagesActions } from '../redux/actions';

const Messages = ({ currentDialogId, fetchMessages, addMessage, items, user, isLoading, attachments }) => {
    
    const [previewImage, setPreviewImage] = useState(null);
    const [blockHeight, setBlockHeight] = useState(220);
    const [isTyping, setIsTyping] = useState(false);
    let typingTimeoutId = null;

    const messagesRef = useRef(null);

    const onNewMessage = (data) => { addMessage(data); };

    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
    };

    useEffect(() => {
        socket.on('DIALOGS:TYPING', toggleIsTyping);
    }, []);

    useEffect(() => {
        if (attachments.length) {
          setBlockHeight(332);
        } else {
          setBlockHeight(220);
        }
      }, [attachments]);

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId._id);
        }
        socket.on('SERVER:NEW_MESSAGE', onNewMessage)

        return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
    }, [currentDialogId]);

    
    useEffect(() => {
        if (currentDialogId) {messagesRef.current.scrollTo(0, 99999999);}    
    }, [items, isTyping]);

    if (!currentDialogId ) {
        return <Empty description="Open a dialog" />;
    }

    return (
        <BaseMessages
            user={user}
            blockRef={messagesRef}
            items={items}
            isLoading={isLoading && !user}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
            blockHeight={blockHeight}
            isTyping={isTyping}
            partner={
                user._id !== currentDialogId.partner._id ? currentDialogId.author : currentDialogId.partner
            }
        />
    );

    
};

export default connect(({ dialogs, messages, user, attachments }) => ({currentDialogId: find(dialogs.items, { _id: dialogs.currentDialogId }), items: messages.items, isLoading: messages.isLoading, attachments: attachments.items, user: user.data}), messagesActions)(Messages);
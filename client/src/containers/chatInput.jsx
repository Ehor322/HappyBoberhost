import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ChatInput as ChatInputBase } from '../components';
import { messagesActions, attachmentsActions } from '../redux/actions';
import { filesApi } from '../utils/api';
import socket from '../core/socket';

const ChatInput = (props) => {
    const { dialogs: {currentDialogId}, attachments, fetchSendMessage, setAttachments, removeAttachment, user } = props;
    const [value, setValue] = useState(null);

    const sendMessage = () => {
        fetchSendMessage(value.trim(), currentDialogId, attachments.map(file => file.uid))
        setValue("");
        setAttachments([]);
    }

    const handleSendMessage = e => {
        socket.emit('DIALOGS:TYPING', { dialogId: currentDialogId, user });
        if ((value.trim().length > 0 || attachments.length > 0) && e.keyCode === 13) {
            sendMessage();
        }
    }

    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++){
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading'
                }
            ];
            setAttachments(uploaded);
            await filesApi.upload(file).then(({ data }) => { 
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url,
                            status: 'done',
                        }
                    }
                    return item;
                })
            });
        }
        setAttachments(uploaded);
    }

    if (!currentDialogId || currentDialogId.includes('/chat')) {
        return null;
    }

    return <ChatInputBase value={value} setValue={setValue} handleSendMessage={handleSendMessage} sendMessage={sendMessage} onSelectFiles={onSelectFiles} attachments={attachments} removeAttachment={removeAttachment} />
}

export default connect(({dialogs, attachments, user}) => ({dialogs, attachments: attachments.items, user: user.data}), {...messagesActions, ...attachmentsActions})(ChatInput);
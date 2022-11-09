import { ChangeEvent, useMemo, useState } from 'react';
import { useApp } from 'contexts/AppProvider';
import { useAuth } from 'contexts/AuthProvider';
import { addDocument } from 'helpers/services';
import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import Message from 'components/ui/Message';
import useFirestore from 'hooks/useFirestore';
import styled from 'styled-components';
import { MessageType } from 'types/App';
import { CollectionCondition, CollectionName, QueryCollectionMode } from 'types/Firestore';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .chat-window__header-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  padding: 1rem;
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: scroll;
`;

const ChatWindow = () => {
  const { roomMembers, selectedRoom, setIsInviteMemberModalVisible } = useApp();
  const { user } = useAuth();

  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const messageCondition = useMemo<CollectionCondition>(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom?.id || '',
    }),
    [selectedRoom?.id],
  );

  const { documents: messages } = useFirestore<MessageType>(
    CollectionName.MESSSAGES,
    messageCondition,
    QueryCollectionMode.GET_REAL_TIME,
  );

  const handleInviteMember = () => {
    setIsInviteMemberModalVisible?.(true);
  };

  const handleOnSubmit = async () => {
    try {
      await addDocument(CollectionName.MESSSAGES, {
        text: inputValue,
        uid: user?.uid,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        roomId: selectedRoom?.id,
      });
    } catch (error) {
      console.log(error);
    }

    form.resetFields(['message']);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <WrapperStyled>
      {selectedRoom?.id ? (
        <>
          <HeaderStyled>
            <div className="chat-window__header-info">
              <p className="text-lg ma-0">{selectedRoom?.name}</p>
              <span className="text-sm">{selectedRoom?.description}</span>
            </div>
            <div className="d-flex align-center">
              <Button icon={<UserAddOutlined />} type="text" onClick={handleInviteMember}>
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {roomMembers.map((member) => (
                  <Tooltip title={member.displayName} key={member.uid}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? member.photoURL
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </HeaderStyled>
          <ContentStyled className="d-flex flex-column justify-end">
            <MessageListStyled>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.text}
                  displayName={message.displayName}
                  photoURL={message.photoURL}
                  createdAt={message.createdAt}
                />
              ))}
            </MessageListStyled>
            <Form form={form}>
              <Form.Item name="message">
                <Input
                  autoComplete="off"
                  placeholder="Type something..."
                  bordered={false}
                  onPressEnter={handleOnSubmit}
                  onChange={handleInputChange}
                ></Input>
                <Button type="primary" onClick={handleOnSubmit}>
                  Send
                </Button>
              </Form.Item>
            </Form>
          </ContentStyled>
        </>
      ) : (
        <Alert message="Choose a room to chat" type="info" showIcon style={{ margin: '5px' }} />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;

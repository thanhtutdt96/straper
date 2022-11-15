import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from 'contexts/AppProvider';
import { useAuth } from 'contexts/AuthProvider';
import { addDocument } from 'helpers/services';
import { SendOutlined, UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import { AccentButton } from 'components/ui/Common/styled';
import Message from 'components/ui/Message';
import useFirestore from 'hooks/useFirestore';
import styled from 'styled-components';
import { MessageType } from 'types/App';
import { CollectionCondition, CollectionName, QueryCollectionMode } from 'types/Firestore';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5.5rem;
  padding: 0 1.25rem;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 1rem;
  background: linear-gradient(to bottom right, rgb(111 117 123) 0%, rgb(164 170 178) 100%);

  .chat-window__header-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    p {
      font-weight: 700;
      font-size: var(--text-lg);
      margin-bottom: 0.25rem;
    }

    span {
      font-size: var(--text-sm);
      opacity: 0.7;
    }
  }

  .chat-window__invite-group {
    display: flex;
    align-items: center;
  }

  .ant-btn {
    color: var(--color-accent);
    border-color: var(--color-accent);
    margin-right: 0.5rem;
  }
`;

const WrapperStyled = styled.div`
  height: 100%;
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: calc(100% - 5.5rem);
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
  padding: 1.25rem;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  margin: 1rem;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
    margin-right: 0.5rem;
  }
`;

const ChatWindow = () => {
  const { roomMembers, selectedRoom, setIsInviteMemberModalVisible } = useApp();
  const { user } = useAuth();

  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const endMessageListRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    endMessageListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInviteMember = () => {
    setIsInviteMemberModalVisible?.(true);
  };

  const handleOnSubmit = async () => {
    if (!inputValue || inputValue?.trim()?.length === 0) {
      return;
    }

    const sendValue = inputValue;
    setInputValue('');
    form.resetFields(['message']);

    try {
      await addDocument(CollectionName.MESSSAGES, {
        text: sendValue,
        uid: user?.uid,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        roomId: selectedRoom?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <WrapperStyled>
      {selectedRoom?.id ? (
        <>
          <HeaderStyled>
            <div className="chat-window__header-info">
              <p>{selectedRoom?.name}</p>
              <span>{selectedRoom?.description}</span>
            </div>
            <div className="chat-window__invite-group">
              <Button
                icon={<UserAddOutlined />}
                type="primary"
                shape="circle"
                ghost
                size="small"
                danger
                onClick={handleInviteMember}
              />
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
          <ContentStyled>
            <MessageListStyled>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.text}
                  displayName={message.displayName}
                  photoURL={message.photoURL}
                  createdAt={message.createdAt}
                  userUuid={message.uid}
                />
              ))}
              <div ref={endMessageListRef} />
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input.TextArea
                  autoComplete="off"
                  placeholder="Type something..."
                  bordered={false}
                  onPressEnter={handleOnSubmit}
                  onChange={handleInputChange}
                  rows={1}
                  size="large"
                  autoSize
                ></Input.TextArea>
              </Form.Item>
              <AccentButton
                type="primary"
                borderRadius="1rem"
                onClick={handleOnSubmit}
                icon={<SendOutlined />}
              />
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert message="Choose a room to chat" type="info" showIcon style={{ margin: '15px' }} />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;

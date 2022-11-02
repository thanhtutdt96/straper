import { useApp } from 'contexts/AppProvider';
import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import Message from 'components/ui/Message';
import styled from 'styled-components';

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

  const handleInviteMember = () => {
    setIsInviteMemberModalVisible?.(true);
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
              <Message content="sdfsdfs" displayName="tu" photoURL={null} createdAt={'234234'} />
              <Message content="sdfsdfs" displayName="tu" photoURL={null} createdAt={'234234'} />
              <Message content="sdfsdfs" displayName="tu" photoURL={null} createdAt={'234234'} />
            </MessageListStyled>
            <Form>
              <Form.Item>
                <Input autoComplete="off" placeholder="Type something..."></Input>
                <Button type="primary">Send</Button>
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

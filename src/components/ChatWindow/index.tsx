import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import Message from 'components/Message';
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

const ChatWindow = () => (
  <WrapperStyled>
    <HeaderStyled>
      <div className="chat-window__header-info">
        <p className="text-lg ma-0">Room 1</p>
        <span className="text-sm">Day la room 1</span>
      </div>
      <div className="d-flex align-center">
        <Button icon={<UserAddOutlined />} type="text">
          Invite
        </Button>
        <Avatar.Group size="small" maxCount={2}>
          <Tooltip title="A">
            <Avatar>A</Avatar>
          </Tooltip>
          <Tooltip title="B">
            <Avatar>B</Avatar>
          </Tooltip>
          <Tooltip title="C">
            <Avatar>C</Avatar>
          </Tooltip>
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
  </WrapperStyled>
);

export default ChatWindow;

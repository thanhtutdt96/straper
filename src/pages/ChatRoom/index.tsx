import { Col, Row } from 'antd';
import ChatWindow from 'components/ChatWindow';
import Sidebar from 'components/Sidebar';

const ChatRoom = () => {
  return (
    <div>
      <Row>
        <Col span={8}>
          <Sidebar />
        </Col>
        <Col span={16}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
};
export default ChatRoom;

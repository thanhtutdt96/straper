import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useApp } from 'contexts/AppProvider';
import { Col, Row } from 'antd';
import ChatWindow from 'components/ui/ChatWindow';
import { MainWrapperStyled } from 'components/ui/Common/styled';
import Sidebar from 'components/ui/Sidebar';
import styled from 'styled-components';

const ColStyled = styled(Col)`
  height: 768px;
  max-height: 100vh;
`;

const ColMessageStyled = styled(ColStyled)`
  background-color: #fff;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const WrapperStyled = styled.div`
  width: 1024px;
  max-width: 100%;
  max-height: 100vh;
  display: flex;
  border-radius: 2.5rem;
`;

const RowStyled = styled(Row)`
  width: 100%;
`;

const ChatRoom = () => {
  const { roomId } = useParams();
  const { setSelectedRoomId } = useApp();

  useEffect(() => {
    if (roomId) {
      setSelectedRoomId?.(roomId);
    }
  }, [roomId, setSelectedRoomId]);

  return (
    <MainWrapperStyled>
      <WrapperStyled>
        <RowStyled>
          <ColStyled span={8}>
            <Sidebar />
          </ColStyled>
          <ColMessageStyled span={16}>
            <ChatWindow />
          </ColMessageStyled>
        </RowStyled>
      </WrapperStyled>
    </MainWrapperStyled>
  );
};

export default ChatRoom;

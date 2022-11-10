import { Col, Row } from 'antd';
import ChatWindow from 'components/ui/ChatWindow';
import { MainWrapperStyled } from 'components/ui/Common/styled';
import Sidebar from 'components/ui/Sidebar';
import styled from 'styled-components';

const ColStyled = styled(Col)`
  height: 768px;
  max-height: 100vh;
`;

const ColSidebarStyled = styled(ColStyled)`
  background-color: var(--color-tertiary);
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
  return (
    <MainWrapperStyled>
      <WrapperStyled>
        <RowStyled>
          <ColStyled span={8}>
            <Sidebar />
          </ColStyled>
          <ColSidebarStyled span={16}>
            <ChatWindow />
          </ColSidebarStyled>
        </RowStyled>
      </WrapperStyled>
    </MainWrapperStyled>
  );
};
export default ChatRoom;

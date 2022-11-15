import { Col, Row } from 'antd';
import RoomList from 'components/ui/RoomList';
import StraperLogo from 'components/ui/StraperLogo';
import UserInfo from 'components/ui/UserInfo';
import styled from 'styled-components';

const SidebarStyled = styled.div`
  background-color: var(--color-sidebar);
  height: 100%;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

const LogoWrapper = styled.div`
  padding: 1rem 1.25rem;
  background: linear-gradient(to bottom right, rgba(74, 111, 165, 1) 0%, rgb(119, 184, 230) 100%);
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1rem;

  .straper-logo {
    transform: translateX(-10px);
  }
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
      <LogoWrapper>
        <StraperLogo titleAttributes={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }} />
      </LogoWrapper>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  );
};

export default Sidebar;

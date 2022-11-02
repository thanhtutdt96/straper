import { Col, Row } from 'antd';
import sidebarBackground from 'assets/sidebar-background.png';
import RoomList from 'components/ui/RoomList';
import UserInfo from 'components/ui/UserInfo';
import styled from 'styled-components';

const SidebarStyled = styled.div`
  background-color: #051e34;
  background-image: url(${sidebarBackground});
  background-position: left 0 bottom 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #fff;
  height: 100vh;
  background-size: 400px 556px;
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
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

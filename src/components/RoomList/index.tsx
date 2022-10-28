import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';

const PanelStyled = styled(Collapse.Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }

    .ant-collapse-content-box {
      padding: 0 3rem;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 0.3rem;
  color: #fff;
`;

const ButtonStyled = styled(Button)`
  color: #fff;
  padding: 0;
`;

const RoomList = () => {
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header="Room list" key="1">
        <LinkStyled>Room 1</LinkStyled>
        <LinkStyled>Room 2</LinkStyled>
        <LinkStyled>Room 3</LinkStyled>
        <ButtonStyled type="text" icon={<PlusSquareOutlined />}>
          Add room
        </ButtonStyled>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;

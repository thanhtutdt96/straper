import { useApp } from 'contexts/AppProvider';
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
  const { rooms, setIsAddRoomModalVisible, setSelectedRoomId } = useApp();

  const handleAddRoom = () => {
    setIsAddRoomModalVisible?.(true);
  };

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header="Room list" key="1">
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId?.(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <ButtonStyled type="text" icon={<PlusSquareOutlined />} onClick={handleAddRoom}>
          Add room
        </ButtonStyled>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;

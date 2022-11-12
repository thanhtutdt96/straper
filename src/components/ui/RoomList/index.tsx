import { FC, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from 'contexts/AppProvider';
import { PlusSquareOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Collapse, Space, Typography } from 'antd';
import styled from 'styled-components';

const PanelStyled = styled(Collapse.Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: var(--color-text-sidebar);
      font-weight: 600;
    }

    .ant-collapse-content-box {
      padding: 0;
    }
  }
`;

const LinkStyled = styled(NavLink)`
  display: block;
  color: var(--color-text-sidebar);
  padding: 0.75rem 1.5rem;
  margin-bottom: 0;

  &:visited {
    color: var(--color-text-sidebar);
  }

  &.active,
  &:hover {
    border-radius: 0.25rem;
    font-weight: 500;
  }

  &:hover {
    background-color: rgba(105, 109, 114, 0.2);
  }

  &.active {
    color: #fff;
    background-color: var(--color-accent);
  }
`;

const ButtonStyled = styled(Button)`
  padding: 0;
  color: var(--color-text-sidebar);
`;

const PanelHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-typography {
    color: var(--color-text-sidebar);
    font-size: var(--text-sm);
    font-weight: 600;
  }
`;

type Props = {
  header: string;
  onButtonClick: (event: MouseEvent<HTMLElement>) => void;
};

const PanelHeader: FC<Props> = ({ header, onButtonClick }) => (
  <PanelHeaderWrapper>
    <Typography.Text>{header}</Typography.Text>
    <ButtonStyled
      size="small"
      type="text"
      icon={<PlusSquareOutlined />}
      onClick={(event) => onButtonClick(event)}
    />
  </PanelHeaderWrapper>
);

const RoomList = () => {
  const { rooms, setIsAddRoomModalVisible, setSelectedRoomId } = useApp();

  const handleAddRoom = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsAddRoomModalVisible?.(true);
  };

  const handleLinkClick = (roomId: string) => {
    setSelectedRoomId?.(roomId);
  };

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header={<PanelHeader header="Room" onButtonClick={handleAddRoom} />} key="1">
        {rooms.map((room) => (
          <LinkStyled
            to={`/rooms/${room.id}`}
            key={room.id}
            onClick={() => handleLinkClick(room.id)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Space size="small" align="center">
              <TeamOutlined />
              {room.name}
            </Space>
          </LinkStyled>
        ))}
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;

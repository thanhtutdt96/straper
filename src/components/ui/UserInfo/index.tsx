import { useAuth } from 'contexts/AuthProvider';
import { Avatar, Button, Typography } from 'antd';
import styled from 'styled-components';

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: #fff;
    margin-left: 0.5rem;
  }
`;

const UserInfo = () => {
  const { logOut, user } = useAuth();

  return (
    <UserInfoWrapper>
      <div>
        <Avatar src={user?.photoURL}>
          {user?.photoURL ? '' : user?.displayName && user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{user?.displayName}</Typography.Text>
      </div>
      <Button onClick={logOut}>Logout</Button>
    </UserInfoWrapper>
  );
};

export default UserInfo;

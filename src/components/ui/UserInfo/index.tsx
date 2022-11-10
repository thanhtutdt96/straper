import { useApp } from 'contexts/AppProvider';
import { useAuth } from 'contexts/AuthProvider';
import { Avatar, Typography } from 'antd';
import { AccentButton } from 'components/ui/Common/styled';
import styled from 'styled-components';

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(82, 38, 83);
  background-color: var(--color-secondary);

  .username {
    color: #fff;
    margin-left: 0.5rem;
  }
`;

const UserInfo = () => {
  const { logOut, user } = useAuth();
  const { clearAppDependencies } = useApp();

  const onLogoutHandler = () => {
    clearAppDependencies();
    logOut();
  };

  return (
    <UserInfoWrapper>
      <div>
        <Avatar src={user?.photoURL}>
          {user?.photoURL ? '' : user?.displayName && user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text strong className="username">
          {user?.displayName}
        </Typography.Text>
      </div>
      <AccentButton type="primary" onClick={onLogoutHandler} danger>
        Logout
      </AccentButton>
    </UserInfoWrapper>
  );
};

export default UserInfo;

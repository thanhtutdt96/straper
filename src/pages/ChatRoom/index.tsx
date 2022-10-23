import { useAuth } from 'contexts/AuthProvider';
import { Button } from 'antd';

const ChatRoom = () => {
  const { logOut } = useAuth();

  return (
    <div>
      <h2>Chat Room</h2>
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
};
export default ChatRoom;

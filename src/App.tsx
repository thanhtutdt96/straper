import { Route, Routes } from 'react-router';
import AddRoomModal from 'components/modals/AddRoomModal';
import InviteMemberModal from 'components/modals/InviteMemberModal';
import ChatRoom from 'pages/ChatRoom';
import Login from 'pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatRoom />} />
      </Routes>
      <AddRoomModal />
      <InviteMemberModal />
    </div>
  );
}

export default App;

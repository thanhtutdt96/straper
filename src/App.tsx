import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import AddRoomModal from 'components/modals/AddRoomModal';
import InviteMemberModal from 'components/modals/InviteMemberModal';
import MainLayout from 'layout/MainLayout';
import ChatRoom from 'pages/ChatRoom';
import Login from 'pages/Login';

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <MainLayout>
      <SwitchTransition>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={{ enter: 500, exit: 500 }}
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div className="page" ref={nodeRef}>
            <Routes location={location}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
      <AddRoomModal />
      <InviteMemberModal />
    </MainLayout>
  );
}

export default App;

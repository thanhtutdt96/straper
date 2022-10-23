import { Route, Routes } from 'react-router';
import ChatRoom from 'pages/ChatRoom';
import Login from 'pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;

import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoom from './components/Modal/AddRoom';
import InviteMember from './components/Modal/InviteMember';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/' element={<ChatRoom />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <AddRoom />
          <InviteMember />
        </AppProvider>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './lib/PrivateRoute'
import Register from './components/Authenticate/Register'
import Login from './components/Authenticate/Login'
import Logout from './components/Authenticate/Logout'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Navbar />
        <Dashboard />
        <Routes>
          {/* <PrivateRoute exact path='/' element={<Dashboard />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </ChakraProvider>

    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom'
import Register from './components/Authenticate/Register'
import Login from './components/Authenticate/Login'
import Logout from './components/Authenticate/Logout'
import { ChakraProvider } from '@chakra-ui/react'
import PrivateRoute from './lib/PrivateRoute';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Navbar />
        {/* <Dashboard /> */}
        <Switch>
          {/* <PrivateRoute exact path='/' element={<Dashboard />} /> */}
          {/* <PrivateRoute exact path={["/", "/dashboard"]} element={<Dashboard />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Switch>
      </ChakraProvider>

    </div>
  );
}

export default App;

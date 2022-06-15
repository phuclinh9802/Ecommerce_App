import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/Authenticate/Register'
import Login from './components/Authenticate/Login'
import Logout from './components/Authenticate/Logout'
import { ChakraProvider } from '@chakra-ui/react'
import PrivateRoute from './lib/PrivateRoute';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated } = auth;

  console.log("APP: " + isAuthenticated)

  return (
    <Router>
      <div className="App">
        <ChakraProvider>
          <Navbar />
          <Dashboard />
          <Switch>
            {/* <Route exact path='/dashboard' element={<PrivateRoute Component={<Dashboard />} />} /> */}
            {/* <Route path={["/", "/dashboard"]} element={<Dashboard />} /> */}
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} />
          </Switch>
        </ChakraProvider>

      </div>
    </Router>
  );
}

export default App;

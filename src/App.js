import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Register from './components/Authenticate/Register'
import Login from './components/Authenticate/Login'
import Logout from './components/Authenticate/Logout'
import { ChakraProvider } from '@chakra-ui/react'
import PrivateRoute from './lib/PrivateRoute';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProductDetails from './components/ProductDetails/ProductDetails';
import products from './data/product'


function App() {
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated } = auth;
  // const location = useLocation();

  console.log("APP: " + isAuthenticated)

  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Navbar />
          <Switch>
            {/* <Route exact path='/dashboard' element={<PrivateRoute Component={<Dashboard />} />} /> */}
            {/* <Route exact path="/login" element={<Login />} /> */}
            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path='/'>
              <Redirect to='/dashboard' />
            </Route>

            <Route exact path={['/', '/dashboard']}>
              <Dashboard />
            </Route>

            <Route path='/products/:id' render={({ match }) => (
              <ProductDetails product={products.find((product) => String(product.id) === match.params.id)} />
            )} />

            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} /> */}
          </Switch>
        </Router>
      </ChakraProvider>

    </div>
  );
}

export default App;

import { Suspense, lazy } from 'react';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Dashboard from "./components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Register from "./components/Authenticate/Register";
import Login from "./components/Authenticate/Login";
import Logout from "./components/Authenticate/Logout";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

import { useSelector } from "react-redux";
// import ProductDetails from "./components/ProductDetails/ProductDetails";
import products from "./data/product";
import CreateProduct from './components/CreateProduct/CreateProduct';
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))

function App() {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  // const location = useLocation();

  console.log("APP: " + isAuthenticated);

  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Suspense fallback={
            <Center height="100vh">
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'

              />
            </Center>
          }>

            <Navbar />
            <Switch>
              {/* <Route exact path='/dashboard' element={<PrivateRoute Component={<Dashboard />} />} /> */}
              {/* <Route exact path="/login" element={<Login />} /> */}
              {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>

              <Route exact path={["/", "/dashboard"]}>
                <Dashboard />
              </Route>

              <Route
                path="/products/:id"
                render={({ match }) => (
                  <ProductDetails
                    product={products.find(
                      (product) => String(product.id) === match.params.id
                    )}
                  />
                )}
              />
              <Route path="/admin/product/create">
                <CreateProduct />
              </Route>

              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} /> */}
            </Switch>
          </Suspense>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;

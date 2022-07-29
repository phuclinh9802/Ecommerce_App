import { Suspense, lazy } from 'react';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Dashboard from "./components/Dashboard/Dashboard";
import products from './data/product';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import Register from "./components/Authenticate/Register";
// import Login from "./components/Authenticate/Login";
// import Logout from "./components/Authenticate/Logout";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import CreateProduct from './components/CreateProduct/CreateProduct';
import { LoginSuccess } from './components/Authenticate/LoginSuccess';
import ShippingPayment from './components/ShippingPayment/ShippingPayment';
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))

function App() {
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
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>

              <Route exact path={["/Ecommerce_App/", "/Ecommerce_App/dashboard"]}>
                <Dashboard />
              </Route>
              <Route exact path="/Ecommerce_App/login/success">
                <LoginSuccess />
              </Route>

              <Route
                path="/Ecommerce_App/products/:id"
                render={
                  ({ match }) => (
                    <ProductDetails
                      product={products.find(
                        (product) => String(product.id) === match.params.id
                      )}
                    />
                  )
                }
              />
              <Route path="/Ecommerce_App/admin/product/create">
                <CreateProduct />
              </Route>
              <Route path="/Ecommerce_App/users/shipping">
                <ShippingPayment />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;

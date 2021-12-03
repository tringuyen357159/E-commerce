import Cart from './pages/Cart';
import Home from './pages/Home'
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from './pages/Success';

function App() {
  const user = useSelector((state) => state.user.isLogin);

  return (
    <div className="App" style={{overflow: 'hidden'}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/products/:category">
            <ProductList />
          </Route>
          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;

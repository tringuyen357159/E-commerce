import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './App.scss';
import Home from './pages/home/Home';
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const admin = useSelector((state) => state.admin);

  return (
    <Router>
        <Switch>
          <Route path="/login">
            {admin.isLogin ? <Redirect to="/" /> : <Login />}
          </Route>
          {admin.isAdmin && (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route> 
              </div>
            </>
          )}
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
  );
}

export default App;

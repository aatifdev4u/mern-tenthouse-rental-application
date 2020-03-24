import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/Navbar/Navbar.js";
import Footer from "./views/Footer/Footer"
import AddProduct from './views/AddProduct/AddProduct';
import AddCustomer from './views/AddCustomer/AddCustomer';
import Book from './views/Book/Book';
import Return from './views/Return/Return';
import Transaction from './views/Transaction/Transaction'
import Payment from './views/Payment/Payment'
import Refunded from './views/Return/Refunded';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/addproduct" component={Auth(AddProduct, true)} />
          <Route exact path="/addcustomer" component={Auth(AddCustomer, true)} />
          <Route exact path="/book" component={Auth(Book, true)} />
          <Route exact path="/return" component={Auth(Return, true)} />
          <Route exact path="/transaction" component={Auth(Transaction, true)} />
          <Route exact path="/transaction/:transactionId" component={Auth(Payment, true)} />
          <Route exact path="/transaction/refund/:transactionId" component={Auth(Refunded, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;

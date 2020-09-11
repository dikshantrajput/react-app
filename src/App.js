import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Home from './components/Home/Home';
import Shipment from './components/Shipment/Shipment';
import LogIn from './components/LogIn/LogIn';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/shop">
            <Home></Home>
          </Route>
          <Route path="/order">
            <Order></Order>
          </Route>
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/shipment">
            <Shipment />
          </Route>
          <Route path="/Login">
            <LogIn />
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route> 
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>          
          <Route path="*">
            <NotFound></NotFound>
          </Route>                   
        </Switch>
      </Router>
    </div>
  );
}

export default App;

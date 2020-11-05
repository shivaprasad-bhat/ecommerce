import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './Screens/Home';
import CartScreen from './Screens/CartScreen';
import ProductScreen from './Screens/ProductScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/orders/:id" component={OrderScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/admin/userslist" component={UserListScreen} />
                    <Route
                        path="/admin/useredit/:id"
                        component={UserEditScreen}
                    />
                    <Route
                        path="/admin/productlist"
                        component={ProductListScreen}
                    />
                    <Route
                        path="/admin/productedit/:id"
                        component={ProductEditScreen}
                    />
                    <Route
                        path="/admin/orderlist"
                        component={OrderListScreen}
                    />
                    <Route path="/" component={Home} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

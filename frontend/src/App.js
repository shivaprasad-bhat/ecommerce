import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './Screens/Home';
import CartScreen from './Screens/CartScreen';
import ProductScreen from './Screens/ProductScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" component={Home} exact />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

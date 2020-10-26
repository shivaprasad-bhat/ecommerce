import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector((state) => {
        return state.cart;
    });
    const { cartItems } = cart;
    console.log(cartItems);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    return <div>Cart</div>;
};

export default CartScreen;

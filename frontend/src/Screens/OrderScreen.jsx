import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';

const addDecimals = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
};

const OrderScreen = ({ match }) => {
    console.log('Order Screen');
    const dispatch = useDispatch();

    const orderId = match.params.id;
    console.log(orderId);

    const orderDetails = useSelector((state) => state.orderDetails);

    const { order, loading, error } = orderDetails;
    console.log(order + ' ' + loading + ' ' + error);

    if (!loading) {
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => {
                return acc + item.price * item.qty;
            }, 0)
        );
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {' '}
                                <strong>Name :</strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered at {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid of {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is Empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x{' '}
                                                    <i className="fas fa-rupee-sign"></i>{' '}
                                                    {item.price} ={' '}
                                                    <i className="fas fa-rupee-sign"></i>{' '}
                                                    {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summery</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>
                                        <i className="fas fa-rupee-sign"></i>{' '}
                                        {order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        <i className="fas fa-rupee-sign"></i>{' '}
                                        {order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        <i className="fas fa-rupee-sign"></i>{' '}
                                        {order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        <i className="fas fa-rupee-sign"></i>{' '}
                                        {order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;

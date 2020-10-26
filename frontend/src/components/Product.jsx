import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <>
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top"></Card.Img>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                </Card.Body>
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3">
                    {' '}
                    <i className="fas fa-rupee-sign"></i> {product.price}
                </Card.Text>
            </Card>
        </>
    );
};

export default Product;

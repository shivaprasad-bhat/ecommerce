import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
    return (
        <>
            <Card className="my-3 p-3 rounded">
                <a href={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top"></Card.Img>
                </a>
                <Card.Body>
                    <a href={`/product/${product._id}`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </a>
                </Card.Body>
                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
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

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; eCommerce. Designed and Developed By{' '}
                        <a href="https://shivaprasad.tech" target="_blank">
                            Shivaprasad Bhat
                        </a>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;

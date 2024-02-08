//inseriamo il footer per tuute le pagine

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <Container fluid className='mt-5'>
            <Row>
                <Col className='text-center'>
                    <p>© 2024 Lipoints</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
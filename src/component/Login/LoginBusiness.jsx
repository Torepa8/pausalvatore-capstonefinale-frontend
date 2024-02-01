//pagina login per gl utenti

import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };
        console.log(user);
    }

    return (
        <Container fluid className='mt-5'>
            <Row>
                <Col xs={12} md={6} lg={4} className='mb-3'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Inserisci la tua email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Inserisci la tua password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Accedi
                        </Button>
                    </Form>
                    <p className='mt-3'>
                        Non sei ancora registrato? <Link to='/registerbusiness'>Registrati</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginUser;
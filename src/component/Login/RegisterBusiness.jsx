//pagina di registrazione utente
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
    const [name, setName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [vat, setVat] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, businessName, mail, vat, password, phone, address};
        //facciamo la post al server per la registrazione
        fetch('https://lipoints-backend.onrender.com/companies/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                alert('Registrazione effettuata');
                //salviamo il token nel local storage
                localStorage.setItem('token', data.token);
                //reindirizziamo l'utente alla home
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Container fluid className='mt-5'>
            <Row>
                <Col xs={12} md={6} lg={4} className='mb-3'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome Azienda</Form.Label>
                            <Form.Control type="text" placeholder="Nome Azienda" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBusinessName">
                            <Form.Label>Tipologia Azienda</Form.Label>
                            <Form.Control type="text" placeholder="Es. Srl Spa o Snc" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicVat">
                            <Form.Label>Partita IVA</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci la partita IVA" value={vat} onChange={(e) => setVat(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci l'indirizzo" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il numero di telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Inserisci la tua email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Inserisci la tua password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Registrati
                        </Button>
                    </Form>
                    <p className='mt-3'>
                        Sei già registrato? <Link to='/loginbusiness'>Accedi</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
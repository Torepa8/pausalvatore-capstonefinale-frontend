//componente per la registrazione degli utenti

import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
    const [typeUser, setTypeUser] = useState('users');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [vat, setVat] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitUser = (e) => {
        e.preventDefault();
        const user = { name, surname, mail, password };
        //facciamo la post al server per la registrazione
        fetch(`https://lipoints-backend.onrender.com/${typeUser}/`, {
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

    const handleSubmitBusiness = (e) => {
        e.preventDefault();
        const business = {name, businessName, vat, address, phone, mail, password };
        //facciamo la post al server per la registrazione
        fetch(`https://lipoints-backend.onrender.com/${typeUser}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(business),
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

    if(typeUser === 'users') {
    return (
        <Container fluid className='mt-5'>
            <Row className='justify-content-center'>
                <Col xs={12} md={6} lg={4} className='mb-3'>
                    <Form onSubmit={handleSubmitUser}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo nome" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSurname">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo cognome" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="La tua email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="La tua password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>                        
                        <Button variant="primary" type="submit">
                            Registrati
                        </Button>
                        <Form.Check
                            className='mt-3'
                            type="switch"
                            id="custom-switch"
                            label="Sono un'azienda"
                            checked={false}
                            onChange={() => setTypeUser('companies')}
                        />
                    </Form>
                    <p className='mt-3'>
                        Sei già registrato? <Link to='/login'>Accedi</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
} else {
    return (
        <Container fluid className='mt-5'>
            <Row className='justify-content-center'>
                <Col xs={12} md={6} lg={4} className='mb-3'>
                    <Form onSubmit={handleSubmitBusiness}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo nome" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBusinessName">
                            <Form.Label>Ragione Sociale</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci la ragione sociale" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicVat">
                            <Form.Label>P.IVA</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci la tua partita iva" value={vat} onChange={(e) => setVat(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo indirizzo" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo numero di telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="La tua email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="La tua password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Registrati
                        </Button>
                        <Form.Check
                            className='mt-3'
                            type="switch"
                            id="custom-switch"
                            label="Sono un'azienda"
                            checked={true}
                            onChange={() => setTypeUser('users')}
                        />
                    </Form>
                    <p className='mt-3'>
                        Sei già registrato? <Link to='/login'>Accedi</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
}

export default Register;
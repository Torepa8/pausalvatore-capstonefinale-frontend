//pagina di inserimento locandine/offerte per le aziende

import React from 'react';
import { useCallback, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import Modal from './Modal.jsx';

function Admin() {
    const [show, setShow] = useState(false);
    const [modifica, setModifica] = useState(false);
    const [nameOffer, setNameOffer] = useState('');
    const [description, setDescription] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [type, setType] = useState('');
    const [locandine, setLocandine] = useState([]);
    const token = localStorage.getItem('token');
    const [locClick, setLocClick] = useState('');
    // const [modifica, setModifica] = useState(false);


    //questa fetch carica le locandine del negozio loggato
    const loadLocandine = useCallback(() => {
        fetch(`https://lipoints-backend.onrender.com/locandine/company/${localStorage.getItem("id")}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setLocandine(data);
            })
            .catch(err => console.error(err));
    }, [token]);

    useEffect(() => {
        loadLocandine();
    }, [locandine, loadLocandine]);

    //inserimento campi della locandina selezionata
    const selectLocandina = (id) => {
        const locandinaClick = locandine.find(locandina => locandina._id === id);
        //inseriamo i dati nei campi
        setNameOffer(locandinaClick.nameOffer);
        setDescription(locandinaClick.description);
        setExpirationDate(locandinaClick.expirationDate.substring(0, 10));
        setType(locandinaClick.type);
        setLocClick(locandinaClick._id);
        setModifica(true);
    }

    //questa fetch modifica la locandina selezionata
    const updateLocandina = async (id) => {
        const r = await fetch(`https://lipoints-backend.onrender.com/locandine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ nameOffer, description, expirationDate, type })
        })
        if (r.ok) {
            alert('Locandina modificata');
            // window.location.href = '/admin';
            setShow(true);
        }
        else {
            alert('Errore, riprova');
        }
    }

    //questa fetch elimina la locandina selezionata
    const deleteLocandina = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare la locandina?")) {
            return;
        }

        const r = await fetch(`https://lipoints-backend.onrender.com/locandine/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (r.ok) {
            alert('Locandina eliminata');
            window.location.href = '/admin';
        }
        else {
            alert('Errore, riprova');
        }
    }

    //qui inseriamo la nuova locandina nel proprio negozio
    //l'id verrà recuperato dal backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const offer = { nameOffer, description, expirationDate, type };
        if (!modifica) {
            fetch(`https://lipoints-backend.onrender.com/locandine/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(offer),
            })
                .then(response => response.json())
                .then(data => {
                    alert('Locandina inserita');
                    // window.location.href = '/admin';
                    setShow(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            console.log(locClick);
            updateLocandina(locClick._id);
        }
    }

        return (
            <Container fluid className='mt-5'>
                <Row>
                    <Modal show={show} handleClose={() => setShow(false)} Loc={locandine} />
                    <Col xs={12} md={6} className='mb-3'>
                        <h1>Inserisci una nuova locandina</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control required type="text" placeholder="Inserisci il titolo" value={nameOffer} onChange={(e) => setNameOffer(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Descrizione</Form.Label>
                                <Form.Control required type="text" placeholder="Inserisci la descrizione" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label>Tipologia</Form.Label>
                                <Form.Control required type="text" placeholder="Offerta o Servizio" value={type} onChange={(e) => setType(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicImage">
                                <Form.Label>Scadenza</Form.Label>
                                <Form.Control required type="date" placeholder="Scadenza locandina" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {!modifica && <span>Inserisci</span>}
                                {modifica && <span>Modifica</span>}
                            </Button>
                        </Form>
                    </Col>
                    {locandine ? locandine.map(locandina => (
                        <Col key={locandina._id} xs={12} md={6} lg={4}>
                            <div className='text-center mt-3 border border-success rounded-4'>
                                <h3>{locandina.nameOffer}</h3>
                                <Image src={locandina.image} alt={locandina.nameOffer} className='w-100' />
                                <p>{locandina.description}</p>
                                <p>{locandina.company.name}</p>
                                <p>{locandina.company.expirationDate}</p>
                            </div>
                            <Button variant="primary" onClick={
                                () => { selectLocandina(locandina._id) }
                            }>
                                Modifica
                            </Button>

                            <Button variant="danger" onClick={
                                () => { deleteLocandina(locandina._id); }
                            }>
                                Elimina
                            </Button>
                        </Col>
                    )) : <Spinner animation="border" />}
                </Row>
            </Container>
        );
    }

    export default Admin;
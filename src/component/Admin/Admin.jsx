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

    //fetch per l'immagine della locandina
    const [image, setImage] = useState(new FormData());
    const handlefile = (ev) => {
        setImage((img) => {
            img.delete("image");
            img.append("image", ev.target.files[0])
            return img;
        })
        ev.preventDefault();
    }

    const upimage = useCallback((idloc) => {
        fetch(`https://lipoints-backend.onrender.com/locandine/${idloc}`, {
            method: 'PATCH',
            body: image,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert('Immagine caricata');
                    window.location.href = '/admin';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [image, token]);

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
    }, [loadLocandine]);

    //inserimento campi della locandina selezionata
    const selectLocandina = (id) => {
        // loadLocandine()
        const locandinaClick = locandine.find(locandina => locandina._id === id);
        //inseriamo i dati nei campi
        setNameOffer(locandinaClick.nameOffer);
        setDescription(locandinaClick.description);
        setExpirationDate(locandinaClick.expirationDate.substring(0, 10));
        setType(locandinaClick.type);
        setLocClick(locandinaClick._id);
        setModifica(true);
    }
    
    //fecth per l'inserimento della locandina
    const insertLocandina = useCallback((newLoc)=> {
        alert("Inserimento locandina")
        fetch(`https://lipoints-backend.onrender.com/locandine/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newLoc)
        })
            .then(response => response.json())
            .then(data => {
                alert('Locandina inserita');
                // setLocClick(data._id);
                upimage(data._id);
                // setShow(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [token, upimage]);

    //questa fetch modifica la locandina selezionata
    const updateLocandina = (id) => {
        if (!window.confirm("Sei sicuro di voler modificare la locandina?")) {
            return;
        }
        fetch(`https://lipoints-backend.onrender.com/locandine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ nameOffer, description, expirationDate, type })
        })
            .then(response => response.json())
            .then(data => {
                alert('Locandina modificata');
                // window.location.href = '/admin';
                // setShow(true);
                upimage(id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
        const offer = { nameOffer, description, expirationDate, type };
        if (!modifica) {
            insertLocandina(offer);
        } else {
            updateLocandina(locClick);
        }
        e.preventDefault();
    }

    return (
        <Container fluid className='mt-5'>
            <h3>La tua area</h3>
            <Row>
                <Col xs={12} md={4} className='mb-3 d-flex flex-column align-items-center'>
                    <h3>Inserisci una nuova locandina</h3>
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
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control required type="file" onChange={handlefile} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {!modifica && <span>Inserisci</span>}
                            {modifica && <span>Modifica</span>}
                            <Modal show={show} handleClose={() => setShow(false)} idloc={locClick} />
                        </Button>
                    </Form>
                </Col>
                {locandine ? locandine.map(locandina => (
                    <Col key={locandina._id} xs={12} md={6} lg={4} className='d-flex flex-column'>
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
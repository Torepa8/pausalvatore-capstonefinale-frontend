//componente modal per l'inserimento dell'immagine della locandina

import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function ModalLocandina({ show, handleClose, idLoc }) {

    const [image, setImage] = useState(new FormData());
    const [locandine, setLocandine] = useState([]);
    const token = localStorage.getItem('token');

    const loadLocandine = () => {
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
    }


    const handlefile = (ev) => {
        setImage((img) => {
            img.delete("image");
            img.append("image", ev.target.files[0])
            return img;
        })
        ev.preventDefault();
        loadLocandine();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        //facciamo la post al server per la registrazione
        fetch(`https://lipoints-backend.onrender.com/locandine/${idLoc}`, {
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
            });
    }

    return (
        <Modal show={show} onHide={handleClose} idLoc={idLoc}>
            <Modal.Header closeButton>
                <Modal.Title>Inserisci l'immagine della locandina</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Immagine</Form.Label>
                        <Form.Control type="file" onChange={handlefile} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Inserisci
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalLocandina;
//pagina di dettaglio locandina

import { Container, Row, Col, Image } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//recuperiamo l'id dai params
import { useParams } from 'react-router-dom';

function LocDetails() {
    const { id } = useParams();
    //recuperiamo l'id della locandina
    const [locandine, setLocandine] = useState({ nameOffer: '', description: '', expirationDate:'', company: { name: '', address: '', phone:'', mail:'' }, image: '' });
    //carico le locandine dal server
    const loadLocandine = useCallback(() => {
        fetch(`https://lipoints-backend.onrender.com/locandine/${id}`)
            .then(response => response.json())
            .then(data => {
                setLocandine(data);
                console.log(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        loadLocandine();
    }, [loadLocandine]);

    return (
        <Container fluid className='mt-5'>
            <button
                className='backbutton m-4 p-1 rounded rounded-4'
                onClick={() => window.history.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" fill="#120091" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
                <span>Indietro</span>
            </button>
            <Row>
                <Col xs={12} md={6} className='overflow-hidden rounded rounded-4'>
                    <Image
                        className='object-fit-cover w-100 rounded rounded-4'
                        src={locandine.image} alt={locandine.nameOffer}
                    />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <div className='text-center mt-3 border border-success rounded-4'>
                        <h3>{locandine.nameOffer}</h3>
                        <p>{locandine.description}</p>
                        <p>{locandine.expirationDate}</p>
                        <p>{locandine.company.name}</p>
                        <p>{locandine.company.address}</p>
                        <p>{locandine.company.phone}</p>
                        <p>{locandine.company.mail}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LocDetails;
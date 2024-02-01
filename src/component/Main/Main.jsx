//compentente che gestirà le locandine dei servizi e negozi principali

import React, { useCallback, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Main({search}) {
    const [show, setShow] = useState(true);
    const [locandine, setLocandine] = useState([]);
    //carico le locandine da mongoDB e le salvo in un array
    const loadLocandine = useCallback(() => {
        fetch(process.env.BACKEND_URL + '/locandine')
            .then(response => response.json())
            .then(data => {
                setLocandine(data);
                setShow(false);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        loadLocandine();
    }, [loadLocandine]);


    return (
        //dopo aver caricato le locandine e averle salvate in un array, le mostro in un carousel
        <Container fluid className='mt-5'>
            {/* //inseriamo lo Spinner e sarà visibile solo se show è true */}
            {alert(process.env.BACKEND_URL)}
            {show===true&&<Spinner animation="border" />}
            <Row>
                {locandine.filter((locandina) => locandina.nameOffer.toLowerCase().includes(search.toLowerCase()))
                .map((locandina) => (
                    <Col xs={12} md={6} lg={4} className='mb-3'>
                        <h3>{locandina.nameOffer}</h3>
                        <Image src={locandina.image} alt={locandina.nameOffer} className='w-100' rounded />
                        <p>{locandina.description}</p>
                        <p>{locandina.company.name}</p>
                        <p>{locandina.company.address}</p>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Main;
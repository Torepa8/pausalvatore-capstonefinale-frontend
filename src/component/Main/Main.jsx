//compentente che gestirà le locandine dei servizi e negozi principali

import React, { useCallback, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Search from '../Search/search.jsx';

function Main({ search, setSearch }) {
    const [show, setShow] = useState(true);
    const [locandine, setLocandine] = useState([]);
    //carico le locandine dal server
    const loadLocandine = useCallback(() => {
        fetch("https://lipoints-backend.onrender.com/locandine")
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
            <Search search={search} setSearch={setSearch} />
            {/* //inseriamo lo Spinner e sarà visibile solo se show è true */}
            {show === true && <Spinner animation="border" />}
            <Row>
                {locandine.filter((locandina) => locandina.nameOffer.toLowerCase().includes(search.toLowerCase()))
                    .map((locandina) => (
                        <Col key={locandina._id} xs={12} md={6} lg={4}>
                            <div className='text-center mt-3 border border-success rounded-4'>
                                <h3>{locandina.nameOffer}</h3>
                                <Image src={locandina.image} alt={locandina.nameOffer} className='w-100' />
                                <p>{locandina.description}</p>
                                <p>{locandina.company.name}</p>
                                <p>{locandina.company.address}</p>
                            </div>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}

export default Main;
//compentente che gestirà le locandine dei servizi e negozi principali

import React, { useCallback, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mainstyles.scss';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Search from '../Search/search.jsx';
import { Link } from 'react-router-dom';

function Main({ search, setSearch }) {
    const [show, setShow] = useState(true);
    const [locandine, setLocandine] = useState([]);
    //carico le locandine dal server
    const loadLocandine = useCallback(() => {
        fetch("https://lipoints-backend.onrender.com/locandine")
            .then(response => response.json())
            .then(data => {
                setLocandine(data);
                setShow(false);//nascondo lo spinner
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        loadLocandine();
    }, [loadLocandine]);


    return (
        //dopo aver caricato le locandine e averle salvate in un array, le mostro in un carousel
        <Container fluid className='mt-5'>
            <h2 className='text-center'>Le offerte e i servizi del quartiere - Li punti</h2>
            <Search search={search} setSearch={setSearch} />
            {/* //inseriamo lo Spinner e sarà visibile solo se show è true */}
            {show && <Spinner animation="border" />}
            <Row>
                {locandine.filter((locandina) => locandina.nameOffer.toLowerCase().includes(search.toLowerCase()))
                    .map(locandina => (
                        <Col key={locandina._id} xs={12} md={6} lg={4}>
                            <Link loc={locandina} className='text-decoration-none' to={`/details/${locandina._id}`}>
                                <div className='text-center mt-3 border border-success rounded-4'>
                                    <h3>{locandina.nameOffer}</h3>
                                    <Image src={locandina.image} alt={locandina.nameOffer} className='w-100' />
                                    <p>{locandina.description}</p>
                                    <p>{locandina.company.name}</p>
                                    <p>{locandina.company.address}</p>
                                </div>
                            </Link>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}

export default Main;
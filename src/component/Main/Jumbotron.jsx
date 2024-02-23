//jumbotron per la pagina principale

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Jumbotron = () =>
    <Container className='d-flex flex-column align-items-center'>
        <h2>Ciao! Qui troverai le offerte del quartiere - Li Punti</h2>
        <Row className='justify-content-center'>
            <Col xs={12}>
                <p>
                    {/* Li Punti: Una frazione in espansione a Sassari. <br />
                    Li Punti è una vivace frazione di Sassari,
                    da cui dista solamente 4 km. Si tratta di un quartiere in espansione,
                    con una popolazione di circa 20.000 abitanti. Conosciuto anche come "li ponti",
                    il toponimo si riferisce alla presenza dell'acquedotto romano a cui le arcate ricordavano
                    la forma di un ponte. */}
                </p>
            </Col>
        </Row>
    </Container >;

export default Jumbotron;
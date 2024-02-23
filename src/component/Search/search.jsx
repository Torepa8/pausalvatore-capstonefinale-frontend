//form per la ricerca delle locandine 

import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Search = ({ search, setSearch }) => {
    return (
        <Form className='ps-5'>
            <Row>
                <Col xs={8}>
                    <Form.Control
                        type="text"
                        placeholder="Cerca la tua offerta"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col xs={4}>
                    <Button variant="primary" type="submit" className='w-100'>
                        Cerca
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Search;
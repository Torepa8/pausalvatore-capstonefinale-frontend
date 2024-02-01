//form per la ricerca delle locandine 

import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Search = ({ search, setSearch }) => {
    return (
        <Form className='ps-5'>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button variant="primary" type="submit">
                        Cerca
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Search;
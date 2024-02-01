import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logolipoints.png';
import './navstyles.scss';

function NavComponent() {
    return (
        <Navbar className='m-5 border border-success rounded-4' expand="lg">
            <Container>
                <Image id="logo" src={logo} alt="logo" className='position-absolute'/>
                {/* <Navbar.Brand href="#home">Service and Offer</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className='fs-5' border='success' href="/">Home</Nav.Link>
                        <Nav.Link className='fs-5' href="#link">Service</Nav.Link>
                        <Nav.Link className='fs-5' href="#link">Offer</Nav.Link>
                        <Nav.Link className='fs-5' href="#link">Contatti</Nav.Link>
                        <Nav.Link className='fs-5' href="/registeruser">Login User</Nav.Link>
                        <Nav.Link className='fs-5' href="/registerbusiness">Login Business</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavComponent;
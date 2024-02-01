import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logolipoints.png';
import './styles.scss';

function NavComponent() {
    return (
        <Navbar expand="lg">
            <Container>
                <Image id="logo" src={logo} alt="logo"/>
                <Navbar.Brand href="#home">Lipoints - Service and Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className='fs-5' href="#home">Home</Nav.Link>
                        <Nav.Link className='fs-5' href="#link">Service</Nav.Link>
                        <Nav.Link className='fs-5' href="#link">Shopping</Nav.Link>
                        <Nav.Link className='fs-5' href="#link">Contatti</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavComponent;
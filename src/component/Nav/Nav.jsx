import { Image, Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logolipoints.png';
import './navstyles.scss';


function NavComponent({ userLog, setUserLog }) {
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        setUserLog(false);
        window.location.href = '/';
    }
    
    return (
        <Navbar className='m-5 rounded-5' expand="lg">
            <Container>
                <Image id="logo" src={logo} alt="logo" className='position-absolute t-0' />
                {/* <Navbar.Brand href="#home">Service and Offer</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='ms-auto' />
                <Navbar.Collapse id="basic-navbar-nav" className='ms-auto'>
                    <Nav className="ms-auto d-flex align-items-end">
                        <Nav.Link className='fs-6' href="/">Home</Nav.Link>
                        <Nav.Link className='fs-6' href="/service">Service</Nav.Link>
                        <Nav.Link className='fs-6' href="/offer">Offer</Nav.Link>
                        <Nav.Link className='fs-6' href="/contact">Contatti</Nav.Link>
                        {userLog ?
                            <NavLink className='fs-6' href="/admin">
                                Ciao {localStorage.getItem('name')}!
                            </NavLink>
                            :
                            <Nav.Link className='fs-6' href="/login">Login</Nav.Link>
                        }
                        {userLog &&
                            <Nav.Link className='fs-6' onClick={logout}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavComponent;
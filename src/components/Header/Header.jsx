import React from 'react'
import './Header.css'
import logo from '../../assets/img/shop.png'
import money from '../../assets/img/dollar.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'

const Header = (props) => {
    const history = useHistory();
    const handleLogout = async () => {

        const r = window.confirm('Are you sure to logout?');
        if (r === true) {
            await localStorage.clear();
            await history.push({
                pathname: '/'
            });
        }
    }

    const { username, saldo, home } = props;

    return (
        <Navbar bg="light" expand="lg">

            <Navbar.Brand href="#home">
                <img src={logo} alt="logo library" className="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {
                        (home === true) ? <Nav.Link href="/home" active>Home</Nav.Link> : <Nav.Link href="/home">Home</Nav.Link>
                    }
                    <Nav.Link href="#"></Nav.Link>
                </Nav>
                <Nav className="justify-content-center">
                    <Nav.Link href="#">{username} &nbsp; | &nbsp; <img src={money} alt="" style={{ width: "3%" }} /> &nbsp; <b>Rp {saldo}</b></Nav.Link>
                </Nav>
                <Nav>
                    {
                        (home === false) ? <Nav.Link eventKey={2} href="/history" active> History</Nav.Link> : <Nav.Link eventKey={2} href="/history"> History</Nav.Link>
                    }
                    <Nav.Link eventKey={2} onClick={handleLogout}> Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;

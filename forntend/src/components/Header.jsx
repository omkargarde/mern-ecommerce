import React from 'react'
import {NavBar,Nav,Container} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
const Header = () => {
  return (
    <header>
        <NavBar bg='dark' variant='dark' expand="lg" collapseOnSelect
        >
            <Container>
                <NavBar.Brand href="/">proShop</NavBar.Brand>
                <NavBar.Toggle aria-controls="basic-navbar-nav"/>
                <NavBar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        
                    </Nav>
                </NavBar.Collapse>
            </Container>
        </NavBar>
    </header>
  )
}

export default Header
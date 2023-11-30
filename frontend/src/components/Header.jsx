/* eslint-disable react/prop-types */
import { Badge, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { FaShopify, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    console.log("logout");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FaShopify size="2rem" className=""></FaShopify>
              proShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart></FaShoppingCart> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <ProfileLinkDropDown
                userInfo={userInfo}
                logoutHandler={logoutHandler}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const ProfileLinkDropDown = ({ userInfo, logoutHandler }) => {
  if (userInfo) {
    return (
      <NavDropdown title={userInfo.name} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  }
  return (
    <LinkContainer to="/login">
      <Nav.Link>
        <FaUser></FaUser> Sign in
      </Nav.Link>
    </LinkContainer>
  );
};
export default Header;   

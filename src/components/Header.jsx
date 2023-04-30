import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { saveProducts } from '../redux/actions';
import { getProductsFromCategoryAndQuery } from '../services/api';

function Header() {
  const sumReducer = useSelector((state) => state.productsSumReducer.sum);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleClick = async () => {
    const products = await getProductsFromCategoryAndQuery('', input);
    dispatch(saveProducts(products.results));
    history.push('/');
  };

  return (
    <div>
      {[1].map((expand) => (
        <Navbar key={ expand } bg="light" expand={ expand } className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={ `offcanvasNavbar-expand-${expand}` } />
            <Navbar.Offcanvas
              id={ `offcanvasNavbar-expand-${expand}` }
              aria-labelledby={ `offcanvasNavbarLabel-expand-${expand}` }
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={ `offcanvasNavbarLabel-expand-${expand}` }>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form className="d-flex">
                  <Form.Control
                    onChange={ handleChange }
                    data-testid="query-input"
                    placeholder="Type your search"
                    type="text"
                  />
                  <Button
                    onClick={ handleClick }
                    data-testid="query-button"
                    variant="outline-success"
                  >
                    Search
                  </Button>
                </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="/cart">
                    <button data-testid="shopping-cart-button" type="button">
                      Cart
                      {' '}
                      <strong data-testid="shopping-cart-size">
                        {Math.abs(sumReducer)}
                      </strong>
                    </button>
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default Header;

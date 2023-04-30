import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useEffect, useState } from 'react';
import { saveProducts, screenWidthReducer } from '../redux/actions';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import './Header.css';
import logo from '../images/logo.png';

function Header() {
  const sumReducer = useSelector((state) => state.productsSumReducer.sum);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const sandBtn = document.querySelector('#sand-btn');
    const categories = document.querySelector('#initial-p-categories');

    if (history.location.pathname === '/') {
      if (screenWidth >= 707) {
        sandBtn.classList.add('hide-sand-btn');
        categories.classList.add('hide-categories');
      } else {
        sandBtn.classList.remove('hide-sand-btn');
        categories.classList.remove('hide-categories');
      }
      if (screenWidth <= 707) {
        categories.classList.add('hide-categories');
      } else {
        categories.classList.remove('hide-categories');
      }
    }
  }, [screenWidth]);

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleClick = async () => {
    const products = await getProductsFromCategoryAndQuery('', input);
    dispatch(saveProducts(products.results));
    history.push('/');
  };

  return (
    <div className="header">
      {[0].map((expand) => (
        <Navbar key={ expand } bg="light" expand={ expand } className="mb-3">
          <Container fluid>
            <Form className="d-flex header-search">
              <Form.Control
                onChange={ handleChange }
                data-testid="query-input"
                placeholder="Type your search"
                type="text"
              />
              <Button
                onClick={ handleClick }
                data-testid="query-button"
                variant="warning"
              >
                Search
              </Button>
            </Form>
            <div className="cont">
              <Navbar.Toggle
                id="sand-btn"
                className="sand-btn"
                aria-controls={ `offcanvasNavbar-expand-${expand}` }
              />

              <img src={ logo } className="brand" alt="logo" />
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/cart" className="cart-link">
                  <div className="cart-container">
                    <i className="fa-solid fa-cart-shopping cart-btn" />
                    <strong
                      className="cart-count"
                      data-testid="shopping-cart-size"
                    >
                      {Math.abs(sumReducer)}
                    </strong>
                  </div>
                </Link>
              </Nav>
            </div>
            <Navbar.Offcanvas
              id={ `offcanvasNavbar-expand-${expand}` }
              aria-labelledby={ `offcanvasNavbarLabel-expand-${expand}` }
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={ `offcanvasNavbarLabel-expand-${expand}` }>
                  Categorias
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="canva-body">
                <Categories />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default Header;

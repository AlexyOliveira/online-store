/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-max-depth */
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useEffect, useState } from 'react';
import { isLoadingReducer, saveProducts } from '../redux/actions';
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
    const hideCategories = 'hide-categories';
    const number = 668;
    const hideSandBtn = 'hide-sand-btn';

    if (history.location.pathname === '/') {
      if (screenWidth >= number) {
        sandBtn.classList.add(hideSandBtn);
        categories.classList.add(hideCategories);
      } else {
        sandBtn.classList.remove(hideSandBtn);
        categories.classList.remove(hideCategories);
      }
      if (screenWidth <= number) {
        categories.classList.add(hideCategories);
      } else {
        categories.classList.remove(hideCategories);
      }
    }
    if (history.location.pathname === '/cart') {
      if (screenWidth >= number) {
        sandBtn.classList.add(hideSandBtn);
      } else {
        sandBtn.classList.remove(hideSandBtn);
      }
    }
  }, [screenWidth]);

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleClick = async () => {
    dispatch(isLoadingReducer(true));
    const products = await getProductsFromCategoryAndQuery('', input);
    dispatch(saveProducts(products.results));
    dispatch(isLoadingReducer(false));
    history.push('/');
  };

  return (
    <div className="header">
      {[0].map((expand) => (
        <Navbar key={ expand } bg="light" expand={ expand } className="mb-3 p-0">
          <Container fluid>
            <Form
              className="d-flex header-search"
              onSubmit={ (e) => {
                e.preventDefault();
                handleClick();
              } }
            >
              <Navbar.Toggle
                id="sand-btn"
                className="sand-btn"
                aria-controls={ `offcanvasNavbar-expand-${expand}` }
              />
              <Form.Control
                onChange={ handleChange }
                onKeyDown={ (e) => {
                  if (e.key === 'Enter') {
                    handleClick();
                  }
                } }
                className="search-area"
                data-testid="query-input"
                placeholder="Digite sua busca"
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
              <img
                style={ { cursor: 'pointer' } }
                src={ logo }
                onClick={ () => history.push('/') }
                className="brand"
                alt="logo"
              />
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
                  <i className="fa-regular fa-rectangle-list categories-icon" />
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

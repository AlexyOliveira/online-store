import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Checkout.css';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import PaymentMethods from '../components/PaymentMethods';

import { setProductsSum } from '../redux/actions';

function CheckOut() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phoneN: '',
    zipCode: '',
    address: '',
    addressComp: '',
    number: '',
    city: '',
    state: '',
    card: '',
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const productsSum = () => {
    const localStorageProducts = localStorage.getItem('cart2709');
    const productsParse = JSON.parse(localStorageProducts);
    const sum = productsParse.reduce((ac, produc) => ac + produc.quantity, 0);
    dispatch(setProductsSum(sum));
  };

  useEffect(() => {
    productsSum();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeRadio = ({ target }) => {
    setFormData({ ...formData, card: target.name });
    const checks = document.querySelectorAll('#paymentMethode');
    checks.forEach((c) => {
      if (c.name !== target.name) {
        c.checked = false;
      }
    });
  };

  const handleSubmit = (e) => {
    if (
      !formData.name
      || !formData.cpf
      || !formData.email
      || !formData.phoneN
      || !formData.zipCode
      || !formData.address
      || !formData.addressComp
      || !formData.number
      || !formData.city
      // || !formData.state
      || !formData.card
    ) {
      e.preventDefault();
      return setIsInvalid(true);
    }
    setIsInvalid(false);
    localStorage.setItem('cart2709', []);
    history.push('/');
  };

  return (
    <div className="checkout-container">
      <Header />
      <form onSubmit={ handleSubmit } className="buy-form" action="">
        <div className="payment-inputs">
          <input
            onChange={ handleChange }
            data-testid="checkout-fullname"
            placeholder="Nome Completo"
            type="text"
            name="name"
            value={ formData.name }
            id=""
          />
          <input
            onChange={ handleChange }
            data-testid="checkout-cpf"
            placeholder="CPF"
            type="text"
            id=""
            name="cpf"
            value={ formData.cpf }
          />
          <input
            onChange={ handleChange }
            data-testid="checkout-email"
            placeholder="Email"
            type="email"
            name="email"
            value={ formData.email }
            id=""
          />
          <input
            onChange={ handleChange }
            placeholder="Telefone"
            data-testid="checkout-phone"
            type="tel"
            id=""
            name="phoneN"
            value={ formData.phoneN }
          />
          <input
            onChange={ handleChange }
            data-testid="checkout-cep"
            placeholder="Cep"
            type="text"
            id=""
            name="zipCode"
            value={ formData.zipCode }
          />
          <input
            onChange={ handleChange }
            data-testid="checkout-address"
            placeholder="Endereço"
            type="text"
            name="address"
            value={ formData.address }
            id=""
          />
          <input
            onChange={ handleChange }
            placeholder="Complemento"
            name="addressComp"
            data-testid="checkout-addressComp"
            value={ formData.addressComp }
            type="text"
          />
          <input
            onChange={ handleChange }
            placeholder="Número"
            type="text"
            name="number"
            data-testid="checkout-number"
            value={ formData.number }
            id=""
          />
          <input
            onChange={ handleChange }
            placeholder="cidade"
            type="text"
            name="city"
            data-testid="checkout-city"
            value={ formData.city }
            id=""
          />
          <select
            className="select-area"
            onChange={ handleChange }
            id="estado"
            name="state"
            value={ formData.state }
          >
            <option value="">Selecione um estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option data-testid="checkout-state" value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        <PaymentMethods handleChangeRadio={ handleChangeRadio } />
        {isInvalid && (
          <span data-testid="error-msg" style={ { color: 'red' } }>
            Preencha todos os campos!
          </span>
        )}
        <button type="submit" data-testid="checkout-btn">
          Comprar
        </button>
      </form>
    </div>
  );
}

export default CheckOut;

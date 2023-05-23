/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import './Form.css';

const arr = ['1', '2', '3', '4', '5'];
function Form() {
  const [email, setEmail] = useState('');
  const [text, setTextArea] = useState('');
  const [isIvalidField, setIsValidField] = useState(false);
  const [rate, setRate] = useState('');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const isCart = localStorage.getItem('id');
    const c = localStorage.getItem(isCart);
    if (c) {
      const f = JSON.parse(c);
      setRates(f);
    }
  }, []);

  useEffect(() => {
    const isCart = localStorage.getItem('id');
    localStorage.setItem(isCart, JSON.stringify(rates));
  }, [rates]);

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleTextArea = ({ target }) => {
    setTextArea(target.value);
  };

  const handleStar = ({ target }) => {
    const stars = document.querySelectorAll(
      '#star-1, #star-2, #star-3, #star-4, #star-5',
    );

    const hateValue = target.id.split('-')[1];
    setRate(hateValue);
    stars.forEach((star) => {
      if (star.id.split('-')[1] <= hateValue) {
        star.className = 'fa-solid fa-star red';
      }
      if (star.id.split('-')[1] > hateValue) {
        star.className = 'fa-regular fa-star';
      }
    });
  };

  const handleSubmit = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email) || !email || !text || !rate) {
      return setIsValidField(true);
    }
    const userHate = {
      email,
      text,
      rate,
    };
    setRates([...rates, userHate]);
    setEmail('');
    setTextArea('');
    return setIsValidField(false);
  };

  return (
    <div className="form-container">
      <div className="review-form">
        <h1>Avaliações</h1>
        <input
          data-testid="product-detail-email"
          onChange={ handleEmail }
          value={ email }
          placeholder="Email"
          type="email"
          name="email"
          id="email"
        />
        <div className="stars-hate">
          {arr.map((a, index) => (
            <i
              id={ `star-${a}` }
              onClick={ handleStar }
              key={ index }
              data-testid={ `${a}-rating` }
              className="fa-regular fa-star"
            />
          ))}
        </div>
        <textarea
          onChange={ handleTextArea }
          data-testid="product-detail-evaluation"
          value={ text }
          name="avaliation"
          id=""
          cols="30"
          rows="10"
        />
        {isIvalidField && (
          <p data-testid="error-msg" style={ { color: 'red' } }>
            Campos inválidos
          </p>
        )}
        <button
          onClick={ handleSubmit }
          data-testid="submit-review-btn"
          type="button"
          className="btn btn-success s"
        >
          Avaliar
        </button>
      </div>
      <div className="rates">
        {rates.map((h, index) => (
          <div
            style={ { background: 'white', margin: '5px', padding: '20px' } }
            key={ index }
          >
            <div className="email-rate">
              <h4 data-testid="review-card-email">{h.email}</h4>
              <p data-testid="review-card-rating">
                {' '}
                {arr.map((a, index2) => (
                  <i
                    key={ index2 }
                    data-testid="review-card-rating"
                    className={
                      a > h.rate ? 'fa-regular fa-star' : 'fa-solid fa-star red'
                    }
                  />
                ))}
              </p>
            </div>
            <p
              style={ { wordWrap: 'break-word', /* Quebra de palavras */
                transition: 'width 0.3s ease' } }
              data-testid="review-card-evaluation"
            >
              {h.text}

            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;

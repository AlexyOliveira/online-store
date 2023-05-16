import React from 'react';
import PropTypes from 'prop-types';

function PaymentMethods({ handleChangeRadio }) {
  return (
    <div className="payment-method">
      <p>
        <strong> Método de Pagamento</strong>
      </p>
      <div className="card">
        <p>Boleto</p>
        <input
          onClick={ handleChangeRadio }
          data-testid="ticket-payment"
          type="radio"
          name="barcode"
          id="paymentMethode"
        />
        <i className="fa-sharp fa-solid fa-barcode" />
      </div>
      <div>
        <p>Cartão de Crédito</p>
        <div className="card-methods">
          <label htmlFor="visa" className="card m-2">
            <input
              onClick={ handleChangeRadio }
              data-testid="visa-payment"
              type="radio"
              name="visa"
              id="paymentMethode"
            />
            <i className="fa-brands fa-cc-visa" />
          </label>
          <label htmlFor="paymentMethode" className="card m-2">
            <input
              onClick={ handleChangeRadio }
              data-testid="master-payment"
              type="radio"
              name="master"
              id="paymentMethode"
            />
            <i className="fa-brands fa-cc-mastercard" />
          </label>

          <label htmlFor="elo" className="card">
            <input
              onClick={ handleChangeRadio }
              data-testid="elo-payment"
              type="radio"
              name="elo"
              id="paymentMethode"
            />
            <i className="fa-solid fa-credit-card" />
          </label>

        </div>

      </div>
    </div>
  );
}

PaymentMethods.propTypes = {
  handleChangeRadio: PropTypes.func,
}.isrequired;

export default PaymentMethods;

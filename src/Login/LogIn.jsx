/** @format */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import storage from '../Services/LocalStorage';

function LogIn({ history }) {
  const [validEmail, setValidEmail] = useState('');
  const [password, setPassord] = useState('');
  const [email1, setEmail] = useState('');

  // referencia: a string de RegEx eu copiei do stackOverflow (https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    setValidEmail(re.test(email));
    setEmail(email);
  }

  function handleClick() {
    console.log('entrou no handleclick');
    storage.clearStorage();
    storage.initStorage();
    storage.setValueByKey('user', { email: email1 });
    storage.setValueByKey('mealsToken', 1);
    storage.setValueByKey('cocktailsToken', 1);
    history.push('/comidas');
  }

  useEffect(() => {
    const button = document.getElementById('submit-btn');
    if (validEmail && password.length > 6) {
      button.disabled = false;
      button.addEventListener('click', () => handleClick());
    } else {
      button.disabled = true;
    }
  });

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="email"
        onChange={(event) => validateEmail(event.target.value)}
        data-testid="email-input"
        required
      />
      <input
        type="password"
        placeholder="senha"
        data-testid="password-input"
        onChange={(event) => setPassord(event.target.value)}
        required
      />
      <button
        id="submit-btn"
        data-testid="login-submit-btn"
        disabled
      >
        Entrar
      </button>
    </div>
  );
}

LogIn.propTypes = {
  fetchToken: PropTypes.func,
}.isRequired;

export default withRouter(LogIn);

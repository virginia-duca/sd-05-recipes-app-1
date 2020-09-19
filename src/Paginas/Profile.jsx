import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import storage from '../Services/LocalStorage';
import { appPage } from '../Services/Utils';

import './style.css';

const Profile = ({ redirect }) => {
  const [email1, setEmail] = useState('');

  useEffect(() => {
    storage.initStorage();
    const key = storage.getValueByKey('user');
    const { email } = key;
    setEmail(email);
  }, []);

  return (
    <div className="profile-container">
      <HeaderTwo titulo={'Perfil'} />
      <div className="btn-container">
        <button
          className="btn"
          onClick={() => redirect('/receitas-feitas')}
          data-testid="profile-done-btn"
        >
          <i class="left material-icons white-text">check</i>
          Receitas Feitas
        </button>
        <button
          className="btn"
          onClick={() => redirect('/receitas-favoritas')}
          data-testid="profile-favorite-btn"
        >
          <i class="left material-icons white-text">favorite</i>
          Receitas Favoritas
        </button>
        <hr />
        <button
          className="btn white black-text"
          onClick={() => {
            localStorage.clear();
            redirect('/');
          }}
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </div>
      <MenuInferior />
    </div>
  );
};

Profile.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(Profile);

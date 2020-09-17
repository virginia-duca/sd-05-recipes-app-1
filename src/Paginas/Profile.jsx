import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import storage from '../Services/LocalStorage';
import { appPage } from '../Services/Utils';

const Profile = ({ redirect }) => {
  const [email1, setEmail] = useState('');

  useEffect(() => {
    storage.initStorage();
    const key = storage.getValueByKey('user');
    const { email } = key;
    setEmail(email);
  }, []);

  return (
    <div>
      <HeaderTwo titulo={'Perfil'} />
      <h1 data-testid="profile-email">{email1}</h1>
      <button onClick={() => redirect('/receitas-feitas')} data-testid="profile-done-btn">
        Receitas Feitas
      </button>
      <button onClick={() => redirect('/receitas-favoritas')} data-testid="profile-favorite-btn">
        {' '}
        Receitas Favoritas
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          redirect('/');
        }}
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <MenuInferior />
    </div>
  );
};

Profile.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(Profile);

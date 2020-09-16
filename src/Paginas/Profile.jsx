import React from 'react';
import { useState, useEffect } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import storage from '../Services/LocalStorage';
import { Link } from 'react-router-dom';
import {appPage} from '../Services/Utils'

const Profile = ({pathname, location, redirect}) => {
  const [email, setEmail] = useState('')

  useEffect(() => {
   const key = storage.getValueByKey('user')
   const { email } = key
   setEmail(email)
  }, [])

  return (
    <div>
      <HeaderTwo titulo={'Perfil'} />
      <h1 data-testid="profile-email">{email}</h1>
        <button 
          onClick={() => redirect('/receitas-feitas')}
          data-testid="profile-done-btn" 
        >Receitas Feitas</button>
        <button 
        onClick={() => redirect('/receitas-favoritas')}
        data-testid="profile-favorite-btn"  
        > Receitas Favoritas</button>
        <button 
        onClick={() => {localStorage.clear(); redirect('/')}}
        data-testid="profile-logout-btn" 
        >Sair</button>
      <MenuInferior />
    </div>
  );
}

export default appPage(Profile);
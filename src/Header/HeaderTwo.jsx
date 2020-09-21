/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './header.css'

class HeaderTwo extends React.Component {
  render() {
    const { titulo } = this.props;
    return (
      <div className="header-container">
        <Link to={'/perfil'}>
        <i className="medium material-icons">account_box</i>
          {/* <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" /> */}
        </Link>
        <h1 data-testid="page-title profile-email" className="titles">
          {titulo}
        </h1>
        <div></div>
      </div>
    );
  }
}

HeaderTwo.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default HeaderTwo;

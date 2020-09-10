/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  handleClick() {
    if (this.state.searchBar) {
      this.setState({ searchBar: false });
    } else {
      this.setState({ searchBar: true });
    }
  }

  renderHeader() {
    const { titulo } = this.props;
    return (
      <div>
        <Link to={'/perfil'}>
          <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{titulo}</h1>
        <button onClick={this.handleClick} data-testid="search-top-btn" src={searchIcon}>
          <img
            src={searchIcon}
            alt="Explorar"
            /* data-testid="search-top-btn" */
          />
        </button>
      </div>
    );
  }
  render() {
    const { searchBar } = this.state;
    if (!searchBar) {
      return this.renderHeader();
    }
    return (
      <div>
        {this.renderHeader()}
        <SearchBar />
      </div>
    );
  }
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;

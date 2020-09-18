import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import './header.css';

class MainHeader extends React.Component {
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
      <div className="header-container">
        <Link to={'/perfil'}>
        <i className="medium material-icons">account_box</i>
        </Link>
        <h4 data-testid="page-title" className="titles text">{titulo}</h4>
        <button
          className="btn-floating search-btn"
          onClick={this.handleClick}
          data-testid="search-top-btn"
          src={searchIcon}
        >
          <i className="material-icons search-btn">search</i>
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

MainHeader.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default MainHeader;

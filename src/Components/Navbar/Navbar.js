import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from './Components/NavbarMenu';
import NavbarUser from './Components/NavbarUser';

import '../Navbar/Navbar.scss'
class Navbar extends Component {
  render() {
    return (
      <nav className='Navbar'>
        <Link to='/'>
          <img src='images/logo.png' alt='ageoste logo' />
        </Link>
        <NavbarMenu />
        <NavbarUser />
      </nav>
    );
  }
}

export default Navbar;

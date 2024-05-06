import React from 'react';
import { Link } from 'react-router-dom'; 
import "./Navbar.scss"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__item'><Link to="/">Overview</Link></li>
        <li className='navbar__item'><Link to="/location">Location</Link></li>
        <li className='navbar__item'><Link to="/members">Members</Link></li>
        <li className='navbar__item'><Link to="/discipline">Discipline</Link></li>
        <li className='navbar__item'><Link to="/industry">Industry</Link></li>
        <li className='navbar__item'><Link to="/experience">Experience</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
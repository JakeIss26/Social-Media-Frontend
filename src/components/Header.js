import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/registration">Registration/Authorization</Link></li>
          <li><Link to="/main">Main</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
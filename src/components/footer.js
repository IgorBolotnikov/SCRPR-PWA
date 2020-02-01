import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  return (
    <div className="footer_container">
      <ul className="footer_list">
        <li><Link className="footer_list_item" to="/about">About</Link></li>
        <li><Link className="footer_list_item" to="/rate">Rate!</Link></li>
        <li><a className="footer_list_item source_code" rel="noopener noreferrer" href="https://github.com/IgorBolotnikov/SCRPR" target="_blank">source_code</a></li>
      </ul>
      <ul className="footer_list">
        <li><a className="footer_list_item" rel="noopener noreferrer" href="https://igorbolotnikov.herokuapp.com">My Portfolio</a></li>
      </ul>
      <div className="footer_lower">
        <p>Bolotnikov Projects</p>
        <p>All rights reserved (not really)</p>
      </div>
    </div>
  );
}

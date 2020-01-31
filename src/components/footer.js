import React from 'react';

export default function Footer(props) {
  return (
    <div className="footer_container">
      <ul className="footer_list">
        <li><a className="footer_list_item" href="#">About</a></li>
        <li><a className="footer_list_item" href="#">Rate!</a></li>
        <li><a className="footer_list_item source_code" rel="noreferrer" href="https://github.com/IgorBolotnikov/SCRPR" target="_blank">source_code</a></li>
      </ul>
      <ul className="footer_list">
        <li><a className="footer_list_item" href="https://igorbolotnikov.herokuapp.com">My Portfolio</a></li>
      </ul>
      <div className="footer_lower">
        <p>Bolotnikov Projects</p>
        <p>All rights reserved (not really)</p>
      </div>
    </div>
  );
}

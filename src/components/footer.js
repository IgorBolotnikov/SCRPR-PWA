import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  function toggleBurgerClass() {
    if (window.innerWidth < 800) {
      const burger = document.getElementById('burger_click');
      const toggle = document.getElementById('toggle');
      burger.classList.remove("change");
      toggle.checked = false;
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    const about = document.getElementById('about');
    const rate = document.getElementById('rate');
    about.addEventListener('click', toggleBurgerClass);
    rate.addEventListener('click', toggleBurgerClass);
    return () => {
      about.removeEventListener('click', toggleBurgerClass);
      rate.removeEventListener('click', toggleBurgerClass);
    }
  }, []);

  return (
    <div className="footer_container">
      <ul className="footer_list">
        <li><Link className="footer_list_item" id="about" to="/about">About</Link></li>
        <li><Link className="footer_list_item" id="rate" to="/rate">Rate!</Link></li>
        <li><a className="footer_list_item source_code" rel="noopener noreferrer" href="https://github.com/IgorBolotnikov/SCRPR" target="_blank">source_code</a></li>
      </ul>
      <ul className="footer_list">
        <li><a className="footer_list_item" rel="noopener noreferrer" href="https://igorbolotnikov.com">My Portfolio</a></li>
      </ul>
      <div className="footer_lower">
        <p>Bolotnikov Projects</p>
        <p>All rights reserved (not really)</p>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Footer(): React.ReactElement {
  const aboutRef = useRef<HTMLAnchorElement>(null);
  const rateRef = useRef<HTMLAnchorElement>(null);

  function toggleBurgerClass(): void {
    if (window.innerWidth < 800) {
      const burger = document.getElementById('burger_click');
      const toggle = document.getElementById('toggle');
      if (burger) {
        burger.classList.remove('change');
      }
      if (toggle) {
        // @ts-ignore
        toggle.checked = false;
      }
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    const about = aboutRef.current;
    const rate = rateRef.current;
    if (about) {
      about.addEventListener('click', toggleBurgerClass);
    }
    if (rate) {
      rate.addEventListener('click', toggleBurgerClass);
    }
    return (): void => {
      if (about) {
        about.removeEventListener('click', toggleBurgerClass);
      }
      if (rate) {
        rate.removeEventListener('click', toggleBurgerClass);
      }
    };
  }, []);

  return (
    <div className="footer_container">
      <ul className="footer_list">
        <li>
          <Link
            ref={aboutRef}
            className="footer_list_item"
            id="about"
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            ref={rateRef}
            className="footer_list_item"
            id="rate"
            to="/rate"
          >
            Rate!
          </Link>
        </li>
        <li>
          <a
            className="footer_list_item source_code"
            rel="noopener noreferrer"
            href="https://github.com/IgorBolotnikov/SCRPR"
            target="_blank"
          >
            source_code
          </a>
        </li>
      </ul>
      <ul className="footer_list">
        <li>
          <a
            className="footer_list_item"
            rel="noopener noreferrer"
            href="https://igorbolotnikov.com"
          >
            My Portfolio
          </a>
        </li>
      </ul>
      <div className="footer_lower">
        <p>Bolotnikov Projects</p>
        <p>All rights reserved (not really)</p>
      </div>
    </div>
  );
}

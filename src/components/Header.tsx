import Navigation from './Navigation';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    navigate('/');
  }

  return (
    <header id="theHeadContainer" className={scrolled ? 'scrolled' : ''}>
      <div id="theHead">
        <div id="headerLogo" onClick={handleClick} />
        <Navigation />
      </div>
    </header>
  );
}
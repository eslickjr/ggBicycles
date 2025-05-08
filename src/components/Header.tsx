import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppointmentModal from "../components/AppointmentModal";

import '../styles/Header.css';

export default function Header() {
  const currentPage = useLocation().pathname;
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight);
  const Navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setMobile(window.innerWidth <= window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    Navigate("/");
  };

  return (
    <header id="theHeadContainer">
      <div id="theNavContainer" className={scrolled ? 'scrolled' : ''}>
        <div id="theHead">
          <div id="headerLogo" onClick={handleClick} />
          <ul id="theNav">
            <li className="nav-item">
              <div onClick={() => {setModal(true)}} className={'nav-link'}>BOOK</div>
            </li>
            <li className="nav-item">
              <Link
                to="/About"
                className={currentPage === '/About' ? 'nav-link active' : 'nav-link'}
              >
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Projects"
                className={currentPage === '/Projects' ? 'nav-link active' : 'nav-link'}
              >
                PROJECTS
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <AppointmentModal mobile={mobile} modal={modal} setModal={setModal}/>
    </header>
  );
}
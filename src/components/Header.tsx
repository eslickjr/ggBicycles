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
    const img1 = new Image();
    img1.src = "../assets/logos/GGBC%20_Logo_Gold2.png";
  }, []);

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
          <div id="headerLogo" role="link" aria-label="Golden Grove Bicycle Co. home" onClick={handleClick} />
          <ul id="theNav">
            <li className="nav-item">
              <Link
                to="/"
                className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/About"
                className={currentPage === '/About' ? 'nav-link active' : 'nav-link'}
              >
                About
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/Projects"
                className={currentPage === '/Projects' ? 'nav-link active' : 'nav-link'}
              >
                Projects
              </Link>
            </li> */}
            <li className="nav-item">
              <button type="button" onClick={() => {setModal(true)}} className="btn btn-primary nav-cta">
                {mobile ? 'Book' : 'Book Appointment'}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <AppointmentModal mobile={mobile} modal={modal} setModal={setModal}/>
    </header>
  );
}
import { Link, useLocation} from "react-router-dom";

export default function Navigation() {
  const currentPage = useLocation().pathname;

  return (
    <ul id="theNav">
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
      {/* <li className="nav-item">
        <Link
          to="/Reviews"
          className={currentPage === '/Reviews' ? 'nav-link active' : 'nav-link'}
        >
          REVIEWS
        </Link>
      </li> */}
    </ul>
  );
}
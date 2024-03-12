import { Link } from "react-router-dom";
import './Navbar.css'
import logo from '../../assets/TITLE.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
          <img src={logo} />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">TOP ANIME</Link>
        </li>
        <li>
          <Link to="/manga">TOP MANGA</Link>
        </li>
        <li>
          <Link to="/characters">CHARACTERS</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

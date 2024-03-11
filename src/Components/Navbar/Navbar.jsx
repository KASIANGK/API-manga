import { Link } from "react-router-dom";
import './Navbar.css'
import logo from '../../assets/OTAK.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
          <img src={logo} />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Top Anime</Link>
        </li>
        <li>
          <Link to="/manga">Top Manga</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

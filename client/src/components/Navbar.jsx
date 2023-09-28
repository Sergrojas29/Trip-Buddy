import logo from '../assets/react.svg';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
  return (
    <header>
      <div id="logoContainer">
        <img src={logo} alt={logo} id="logo"></img>
      </div>
      <div id="btnContainer">
        <Link style={{ textDecoration: 'none' }} className="btnHeader" to="/">
          <div className="btnHeader" href="/">
            HOME
          </div>
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          className="btnHeader"
          to="/saved"
        >
          <div className="btnHeader" href="/saved">
            MY PLACES
          </div>
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Link
              onClick={Auth.logout}
              style={{ textDecoration: 'none' }}
              className="btnHeader"
            >
              LOGOUT
            </Link>
          </>
        ) : (
          <Link
            style={{ textDecoration: 'none' }}
            className="btnHeader"
            to="/login"
          >
            <div className="btnHeader" href="/login">
              LOGIN
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;

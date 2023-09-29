import logo from '../assets/tripBuddyBIG.png';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
  // Set the width of your logo image (e.g., 125px)
  const logoWidth = '90px';

  return (
    <header>
      <div id="logoContainer" style={{ width: logoWidth }}>
        <img src={logo} alt="Trip Buddy Logo" id="logo" style={{ width: '100%' }} />
      </div>
      <div id="btnContainer" style={{ width: '50%', display: 'flex', marginLeft: 'auto' }}>
        <Link style={{ textDecoration: 'none', width: '33%' }} className="btnHeader" to="/">
          HOME
        </Link>
        <Link
          style={{ textDecoration: 'none', width: '33%' }}
          className="btnHeader"
          to="/saved"
        >
          MY PLACES
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Link
              onClick={Auth.logout}
              style={{ textDecoration: 'none', width: '33%' }}
              className="btnHeader"
            >
              LOGOUT
            </Link>
          </>
        ) : (
          <Link
            style={{ textDecoration: 'none', width: '33%' }}
            className="btnHeader"
            to="/login"
          >
            LOGIN
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
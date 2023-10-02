import logo from '../assets/tripBuddyBIG.png';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import yeahBuddy from  '../assets/yeahbuddy.mp3'
import auth from '../utils/auth';

function Navbar() {

  function play() {
    new Audio(yeahBuddy).play()
  }

  return (
    <header>
      <div id="logoContainer" onClick={() => play()}>
        <img src={logo} alt="Trip Buddy Logo" id="logo"/>
      </div>
      <div id="btnContainer" >
        <Link style={{ textDecoration: 'none'}} className="btnHeader" to="/">
          HOME
        </Link>
        <Link
          style={{ textDecoration: 'none'}}
          className="btnHeader"
          to={Auth.loggedIn() ? "/saved" : "/login" }
        >
          MY PLACES
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Link
              onClick={Auth.logout}
              style={{ textDecoration: 'none'}}
              className="btnHeader"
            >
              LOGOUT
            </Link>
          </>
        ) : (
          <Link
            style={{ textDecoration: 'none'}}
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
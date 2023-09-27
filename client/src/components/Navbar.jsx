import logo from '../assets/react.svg'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <header>
        <div id="logoContainer">
            <img src={logo} alt={logo} id="logo"></img>
        </div>
        <div id="btnContainer">
        <Link style={{ textDecoration: 'none' }} className="btnHeader" to="/">
            <h1 className="btnHeader" href='/'>HOME</h1>
            </Link>
        <Link style={{ textDecoration: 'none' }} className="btnHeader" to="/saved">
            <h1 className="btnHeader" href='/saved'>MY PLACES</h1>
            </Link>
        <Link style={{ textDecoration: 'none' }} className="btnHeader" to="/login">
            <h1 className="btnHeader" href='/login' >LOGIN</h1>
            </Link>
            {/* <a className="btnHeader" href='/contactme'>CONTACT ME</a> */}
        </div>
    </header>
  );
}

export default Navbar;

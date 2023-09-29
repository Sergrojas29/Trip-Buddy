import logo from '../assets/tripBuddyBIG.png';
import Auth from '../utils/auth';
import lightWeight from  '../assets/lightWeight.mp3'
import { Link } from 'react-router-dom';
function Footer() {

  function play() {
    new Audio(lightWeight).play()
    
  }

  return (
    <footer >
      <div id="logoContainer" onClick={() => play()}>
        <img src={logo} alt="Trip Buddy Logo" id="logo"/>
      </div>
    </footer>
  );
}

export default Footer;
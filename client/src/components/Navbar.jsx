import logo from '../assets/react.svg'

function Navbar() {
  return (
    
    <header>
        <div id="logoContainer">
            <img src={logo} alt={logo} id="logo"></img>
        </div>
        <div id="btnContainer">
            <a className="btnHeader" href='/'>HOME</a>
            <a className="btnHeader" href='/project'>PROJECTS</a>
            <a className="btnHeader" href='/aboutme' >ABOUT ME</a>
            {/* <a className="btnHeader" href='/contactme'>CONTACT ME</a> */}
        </div>
    </header>
  );
}

export default Navbar;

import logo from '../assets/tripBuddyBIG.png';
import Gitlogo from '../assets/GITHUB-LOGO.png';
import Auth from '../utils/auth';
import lightWeight from '../assets/lightWeight.mp3'
import { Link } from 'react-router-dom';
import Brendan1 from '../assets/audio/Brendan1.mp4'
import JonathanWhisper from '../assets/audio/JonathanWhisper.mp3'
import TimLightWeight from '../assets/audio/TimLightWeight.mp3'
import SergioYell from '../assets/audio/SergioYell.mp3'



function Footer() {


  const authors = [
    {
      name: 'Sergio Rojas-Aguilar',
      url: 'https://github.com/Sergrojas29',
      audio: 1
    },
    {
      name: 'Timothy Salamatin',
      url: 'https://github.com/TSalamatin',
      audio: 2
    },
    {
      name: 'Brendan Sikorjak',
      url: 'https://github.com/brendansikorjak',
      audio: 3
    },
    {
      name: 'Jonathan Sterling',
      url: 'https://github.com/Jsterling56',
      audio: 4
    }
  ]

  function play() {
    new Audio(lightWeight).play()

  }

  function playUserAudio(audio) {
    if (audio == 1) {
      new Audio(SergioYell).play()
    } else if (audio == 2) {
      new Audio(TimLightWeight).play()
    } else if (audio == 3) {
      new Audio(Brendan1).play()
    } else if (audio == 4) {
      new Audio(JonathanWhisper).play()
    }

  }

  return (
    <footer className='ft' >
      <div id="logoContainer" onClick={() => play()}>
        <img src={logo} alt="Trip Buddy Logo" id="logo" />
      </div>

      <div className="footerInfo">
        <h4 className='autherTitle' > AUTHORS'S</h4>
        {authors.map((person, index) => {
          return (
            <div key={index} className="authorContainer">

              <div className="userContainer">
                <div id="gitLogoContainer" onClick={() => playUserAudio(person.audio)}>
                  <img src={Gitlogo} alt="gitlogo" id="smalllogo" />
                </div>
                <a href={person.url} className="name">{person.name}</a>
              </div>
            </div>
          )
        })}

        <div className="copyrightContainer">
          <h3>TRIP BUUUUUUDDY</h3>
          <h3>©2023</h3>
        </div>
      </div>
    </footer >
  );
}

export default Footer;
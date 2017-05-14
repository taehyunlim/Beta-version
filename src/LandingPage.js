import { Parallax, Background } from 'react-parallax';
import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import './LandingPage.css';
import HeroPic from './img/landingpage.jpeg';


const LandingPage = React.createClass({
  render: function () {
      return (

        <img id="heropic" src={HeroPic} />

      )
    }
  });

export default LandingPage

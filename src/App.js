import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
// import logo from './logo.svg';
import './App.css';
import AppBarExampleIcon from './nav-bar'
import CardExampleWithAvatar from './course-item'
import BottomNavigationExampleSimple from './bottom-nav'
import AutoCompleteExampleSimple from './search-bar'
import Logo from './logo.js'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBarExampleIcon />
          <Logo />
          <AutoCompleteExampleSimple />
          <CardExampleWithAvatar />
          <CardExampleWithAvatar />
          <CardExampleWithAvatar />
          <BottomNavigationExampleSimple />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

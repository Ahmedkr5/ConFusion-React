import { Component } from 'react';
import { DISHES } from './shared/dishes';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
class App extends Component {
 

  render() {
    
      return (
        <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
      );
    }
} 


export default App;
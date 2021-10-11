import { Component } from 'react';
import { DISHES } from './shared/dishes';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';  //redux store becomes available to all components in my app
import {ConfigureStore} from './redux/configureStore';


const store= ConfigureStore();
class App extends Component {
 

  render() {
    
      return (

        <Provider store={store}>
        <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
      </Provider>
      );
    }
} 


export default App;
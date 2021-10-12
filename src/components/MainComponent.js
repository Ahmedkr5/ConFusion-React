import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import AboutComponent from './AboutComponent';
import {connect} from 'react-redux';
import { addComment } from '../redux/ActionCreators';
//this will map the Redux Store's state into props that will become available to my component
const mapStateToProps = state /*state from my redux store*/ => {
    return  {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
      //these four now will become available as props to my main component.These are derived from the Redux's Store by connecting this component to the Redux Store(line 74)
    }
}

// read right to left
const mapDistpatchToProps =(dispatch) =>({
  addComment: (dishId,rating,author,comment) =>                              dispatch                 (addComment((dishId,rating,author,comment)))
   //addcomment function will be available within main comp       //given as a param to dispatch fct   //addComment return action object
})
//connection (line 74)

class Main extends Component {

  constructor(props) {
    super(props);
  }

  
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }


  render() {
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment={this.props.addComment}
            />
      );
    };
    return (
      <div>
      <Header />
      <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />
              <Route exact path='/aboutus' component={()=><AboutComponent leaders={this.props.leaders}/>} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
     
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDistpatchToProps)(Main));//connecting component to redux store
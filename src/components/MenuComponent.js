import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import DishdetailComponent from './DishdetailComponent';

import * as moment from 'moment';
class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            comments :null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
        this.setState({ comments: dish.comments});
    }

    renderDish(dish) {
        if (dish != null)
            return(
             
          <DishdetailComponent dish={dish}></DishdetailComponent>

        
         
            );
        else
            return(
                <div></div>
            );
    }
    renderComment(comment) {

        if (comment != null)
        return(
             
           
            <div style={{textAlign:'left'}}><h4>Comments</h4> {comment.map(c=>(<div key={c.id} style={{textAlign:'left'}}>{c.comment} <br/>--<b>{c.author}</b>, {moment(c.date).format('DD MMM, YYYY')}</div>))}</div>
          
           
              );
          else
              return(
                  <div></div>
              );
    }
    render() {
        const menu = this.props.dishes.map((dish,i) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
                  <div className="col-12 col-md-5 m-1">{this.renderComment(this.state.comments)}</div>
                </div>
            </div>
        );
    }
}

export default Menu;
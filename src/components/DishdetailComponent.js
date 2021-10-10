import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
class DishdetailComponent extends Component {
    constructor(props) {
        super(props);
      console.log(props)
    }


    render() {
        if (this.props.dish != null)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
             
                </div>
                <div className="col-12 col-md-5 m-1">
                   
                </div>
            </div>
            </div>
        );
        else
            return(
                <div></div>
            );
    }

    
    







}



    export default DishdetailComponent;
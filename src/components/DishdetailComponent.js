import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, Form, Errors, actions } from 'react-redux-form';
import {  LocalForm} from "react-redux-form";
import Loading from './LoadingComponent';
const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentFormModalOpen: false,
    };

    this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
    this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
  }

  handleCommentFormSubmit(values) {
    this.toggleCommentFormModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    this.props.resetFeedbackForm();

   /* console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));*/
  }

  toggleCommentFormModal() {
    this.setState({
      isCommentFormModalOpen: !this.state.isCommentFormModalOpen,
    });
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleCommentFormModal}>
          <span className="fa fa-comments fa-lg"></span> Submit Comment
        </Button>

        <Modal
          isOpen={this.state.isCommentFormModalOpen}
          toggle={this.toggleCommentFormModal}
        >
          <ModalHeader toggle={this.toggleCommentFormModal}>
            {" "}
            Submit Comment{" "}
          </ModalHeader>
          <ModalBody>
          <LocalForm model="feedback" onSubmit={(values) => this.handleCommentFormSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                    id="rating"
                    validators={{
                      required,
                    }}
                  >
                    <option>Please Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  {" "}
                  Your Name{" "}
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="First Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
function RenderDish({ dish }) {
 
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle> {dish.name} </CardTitle>
            <CardText> {dish.description} </CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ dishId,comments, addComment }) {
  if (comments != null) {
    const cmnts = comments.map((commnts) => {
      return (
        <ul key={commnts.id} className="list-unstyled">
          <li>
            <p> {commnts.comment} </p>
            <p>
              {" "}
              -- {commnts.author}, &nbsp;
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(commnts.date)))}
            </p>
          </li>
        </ul>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
        {cmnts}
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
    // if comments is empty
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if(props.isLoading){
    return (
      <div className="container">
      <div className="row">            
          <Loading />
      </div>
  </div>
    );
  }
  else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
 else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              {" "}
              <Link to="home">Home</Link>{" "}
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;

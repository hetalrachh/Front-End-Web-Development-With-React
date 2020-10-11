import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseURL } from "../shared/baseURL";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
        >
          <Card>
            <CardImg width="100%" src={baseURL + dish.image} alt={dish.alt} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    let allComments = comments.map((comment) => {
      return (
        <Fade in>
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, {moment(comment.date).format("MMM DD, yyyy")}
            </p>
          </li>
        </Fade>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>{allComments}</Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  let dish = props.dish;
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMsg) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMsg}</h4>
        </div>
      </div>
    );
  } else if (dish == null) {
    return <div></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments
          comments={props.comments}
          postComment={props.postComment}
          dishId={props.dish.id}
        />
      </div>
    </div>
  );
};

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    this.toggleModal(); //when clicked on OK -> alert, modal should toggle
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>

                <Col md={12}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                    id="rating"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    name="author"
                    className="form-control"
                    id="author"
                    placeholder="Your name"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  ></Control.text>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  ></Errors>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    id="comment"
                    model=".comment"
                    name="comment"
                    className="form-control"
                    rows="6"
                  ></Control.textarea>
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
      </div>
    );
  }
}

export default DishDetail;

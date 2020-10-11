import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import { actions } from "react-redux-form";
import DishDetail from "./DishdetailComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errormsg}
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errormsg}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMsg={this.props.leaders.errormsg}
        />
      );
    };

    // can accept match, location,history
    const DishWithId = ({ match }) => {
      return (
        // Converts string match.params.id to base 10 integer
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          postComment={this.props.postComment}
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errormsg}
          commentsErrMsg={this.props.comments.errormsg}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout="300"
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              {/* Passes match properties */}
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

//receives state from redux store
//becomes available as props to component
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset("feedback")),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

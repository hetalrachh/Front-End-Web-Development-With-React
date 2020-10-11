import * as ActionTypes from "./ActionTypes";
import { baseURL } from "../shared/baseURL";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };

  newComment.date = new Date().toISOString();
  return fetch(baseURL + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response; //this becomes available to next then
        } else {
          //when server returns an error
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //error handler if the communication to fetch could not be done, when you dont hear anything back from server
        var errmsg = new Error(error.message);
        throw errmsg;
      }
    )
    .then((response) => response.json())
    .then((newComment) => dispatch(addComment(newComment)))
    .catch((error) => {
      console.log("Post comments " + error.message);
      alert("Your comment could not be posted\n Error: " + error.message);
    });
};

//returns dispatch
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseURL + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response; //this becomes available to next then
        } else {
          //when server returns an error
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //error handler if the communication to fetch could not be done, when you dont hear anything back from server
        var errmsg = new Error(error.message);
        throw errmsg;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errormsg) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errormsg,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseURL + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response; //this becomes available to next then
        } else {
          //when server returns an error
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //error handler if the communication to fetch could not be done, when you dont hear anything back from server
        var errmsg = new Error(error.message);
        throw errmsg;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errormsg) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errormsg,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseURL + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response; //this becomes available to next then
        } else {
          //when server returns an error
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //error handler if the communication to fetch could not be done, when you dont hear anything back from server
        var errmsg = new Error(error.message);
        throw errmsg;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromotions(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosFailed = (errormsg) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errormsg,
});

export const addPromotions = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errormsg) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errormsg,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));
  return fetch(baseURL + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errormsg = new Error(error.message);
        throw errormsg;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const postFeedback = (
  firstname,
  lastname,
  telnum,
  email,
  agree,
  contactType,
  message
) => () => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message,
  };

  return fetch(baseURL + "feedback", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response; //this becomes available to next then
        } else {
          //when server returns an error
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //error handler if the communication to fetch could not be done, when you dont hear anything back from server
        var errmsg = new Error(error.message);
        throw errmsg;
      }
    )
    .then((response) => response.json())
    .then((newFeedback) => {
      console.log(JSON.stringify(newFeedback));
      alert("Thank you for your feedback : " + JSON.stringify(newFeedback));
    })
    .catch((error) => {
      console.log("Post feedback " + error.message);
      alert("Your feedback could not be posted\n Error: " + error.message);
    });
};

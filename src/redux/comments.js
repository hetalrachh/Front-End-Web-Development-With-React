import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errormsg: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      //comment.id = state.comments.length; already added by server
      //comment.date = new Date().toISOString();
      //concat is an immutable operation
      return { ...state, comments: state.comments.concat(comment) };

    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errormsg: null,
        comments: action.payload,
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errormsg: action.payload,
        comments: [],
      };
    default:
      return state;
  }
};

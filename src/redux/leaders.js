import * as ActionTypes from "./ActionTypes";

export const Leaders = (
  state = { isLoading: true, errormsg: null, leaders: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        errormsg: null,
        leaders: action.payload,
      };
    case ActionTypes.LEADERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errormsg: null,
        leaders: [],
      };
    case ActionTypes.LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errormsg: action.payload,
        leaders: [],
      };

    default:
      return state;
  }
};

import * as ActionTypes from "./ActionTypes";

export const Promotions = (
  state = { isLoading: true, errormsg: null, promotions: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errormsg: null,
        promotions: action.payload,
      };
    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errormsg: null, promotions: [] };
    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errormsg: action.payload,
        promotions: [],
      };
    default:
      return state;
  }
};

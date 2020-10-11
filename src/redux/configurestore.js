import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { Comments } from "./comments";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form"; //creates a reducer that takes care of forms
import { InitialFeedback } from "./forms";

//applyMiddleware returns an enhancer
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({ feedback: InitialFeedback }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};

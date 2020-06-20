import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authreducer";
import screamReducer from "./reducers/screamreducer";
import userReducer from "./reducers/userreducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  screamReducer: screamReducer,
  userReducer: userReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;

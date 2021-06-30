import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import caesarKeyReducer from "./caesarReducers/caesarKeyReducer";
import caesarLogic from "./caesarReducers/caesarLogicReducer";
import caesarToggle from "./caesarReducers/caesarToggleReducer";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  caesarKey: caesarKeyReducer,
  caesarLogic: caesarLogic,
  caesarToggle: caesarToggle
});

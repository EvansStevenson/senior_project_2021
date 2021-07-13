import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import updateProgress from "./progressReducer";
import caesarKeyReducer from "./caesarReducers/caesarKeyReducer";
import caesarLogic from "./caesarReducers/caesarLogicReducer";
import caesarToggle from "./caesarReducers/caesarToggleReducer";
import caesarTest from "./caesarReducers/caesarTestReducer";
import caesarTestInput from "./caesarReducers/caesarTestInputReducer";
import checkError from "./caesarReducers/caesarErrorReducer"


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  updateProgress: updateProgress,
  caesarKey: caesarKeyReducer,
  caesarLogic: caesarLogic,
  caesarToggle: caesarToggle,
  caesarTest: caesarTest,
  caesarTestInput: caesarTestInput,
  checkError: checkError
});

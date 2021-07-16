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
import playfairExampleText from "./playfairReducers/playfairExampleText"
import playfairTestInput from "./playfairReducers/updateTestInput"
import playfairCheck from "./playfairReducers/playfairCheck"


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  updateProgress: updateProgress,
  // caesar 
  caesarKey: caesarKeyReducer,
  caesarLogic: caesarLogic,
  caesarToggle: caesarToggle,
  caesarTest: caesarTest,
  caesarTestInput: caesarTestInput,
  checkError: checkError,
  // playfair 
  playfairExampleText: playfairExampleText,
  playfairTestInput: playfairTestInput,
  playfairCheck: playfairCheck
});

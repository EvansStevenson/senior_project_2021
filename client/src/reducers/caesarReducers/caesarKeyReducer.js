// import { INCREMENT_CAESAR_KEY } from "../actions/types";

export default function(state = 0, action) {
    switch (action.type) {
      case "INCREMENT_CAESAR_KEY":
        return state + 1;
      case "DECREMENT_CAESAR_KEY":
        return state - 1;
      case "RESET_KEY":
        return state = 0;
      default:
        return state;
    }
}
  
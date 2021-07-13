export default function(state = "", action) {
    switch (action.type) {
      case "UPDATE_CAESAR_INPUT":
        return action.payload;
      default:
        return state;
    }
}  
  
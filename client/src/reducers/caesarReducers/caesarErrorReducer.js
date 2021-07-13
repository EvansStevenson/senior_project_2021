export default function(state = "", action) {
    switch (action.type) {
      case "CHECK_ERROR":
        return action.payload
      default:
        return state;
    }
}
  
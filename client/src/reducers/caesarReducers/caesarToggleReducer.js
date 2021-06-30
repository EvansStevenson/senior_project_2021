

export default function(state = true, action) {
    switch (action.type) {
      case "TOGGLE_CAESAR":
        return action.payload
      default:
        return state;
    }
}
  
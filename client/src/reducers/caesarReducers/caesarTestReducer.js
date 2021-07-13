const initialState = {
    modAlphabet: "abcdefghijklmnopqrstuvwxyz",
};

export default function(state = initialState, action) {
    switch (action.type) {
      case "CAESAR_MOD_ALPHABET":
        return {
           modAlphabet: action.payload,
        }
      default:
        return state;
    }
}
  
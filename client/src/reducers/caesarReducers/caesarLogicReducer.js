// import { INCREMENT_CAESAR_KEY } from "../actions/types";

const initialState = {
    plaintext: "",
    ciphertext: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
      case "UPDATE_CAESAR_CIPHERTEXT":
        return {
            plaintext: action.payload.plainText,
            ciphertext: action.payload.cipherText,
        }
      case "UPDATE_CAESAR_PLAINTEXT":
        return {
            plaintext: action.payload.plainText,
            ciphertext: action.payload.cipherText,
        }
      case "DEFAULT_TEXT":
        return {
          plaintext: "",
          ciphertext: ""
        }
      default:
        return state;
    }
}
  
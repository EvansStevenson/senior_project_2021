// import { INCREMENT_CAESAR_KEY } from "../actions/types";

const initialState = {
    key: "",
    plaintext: "",
    ciphertext: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "UPDATE_PLAYFAIR_KEY":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "UPDATE_PLAYFAIR_CIPHERTEXT":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "UPDATE_PLAYFAIR_PLAINTEXT":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "ENCRYPT_PLAYFAIR":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "DECRYPT_PLAYFAIR":
            return{
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "DEFAULT_PLAYFAIR_TEXT":
            return {
                key: "",
                plaintext: "",
                ciphertext: ""
            }
        default:
            return state;
    }
}

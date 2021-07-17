const initialState = {
    key: "",
    plaintext: "",
    ciphertext: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "UPDATE_VIGENERE_KEY":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "UPDATE_VIGENERE_CIPHERTEXT":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "UPDATE_VIGENERE_PLAINTEXT":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "ENCRYPT_VIGENERE":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "DECRYPT_VIGENERE":
            return{
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "DEFAULT_VIGENERE_TEXT":
            return {
                key: "",
                plaintext: "",
                ciphertext: ""
            }
        default:
            return state;
    }
}

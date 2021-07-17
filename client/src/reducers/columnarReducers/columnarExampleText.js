const initialState = {
    key: "",
    plaintext: "",
    ciphertext: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "UPDATE_COLUMNAR_KEY":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "UPDATE_COLUMNAR_CIPHERTEXT":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "UPDATE_COLUMNAR_PLAINTEXT":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "ENCRYPT_COLUMNAR":
            return {
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "DECRYPT_COLUMNAR":
            return{
                key: action.payload.key,
                plaintext: action.payload.plaintext,
                ciphertext: action.payload.ciphertext,
            }
        case "DEFAULT_COLUMNAR_TEXT":
            return {
                key: "",
                plaintext: "",
                ciphertext: ""
            }
        default:
            return state;
    }
}

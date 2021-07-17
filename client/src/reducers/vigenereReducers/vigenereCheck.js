export default function (state = "", action) {
    switch (action.type) {
        case "CHECK_VIGENERE":
            return action.payload
        default:
            return state;
    }
}

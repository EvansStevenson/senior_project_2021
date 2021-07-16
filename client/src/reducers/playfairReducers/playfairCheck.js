export default function (state = "", action) {
    switch (action.type) {
        case "CHECK_PLAYFAIR":
            return action.payload
        default:
            return state;
    }
}

export default function (state = "", action) {
    switch (action.type) {
        case "CHECK_COLUMNAR":
            return action.payload
        default:
            return state;
    }
}
